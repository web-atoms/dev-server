var app = require("./dist/server/WebServer");
var process = require("process");
var portfinder = require("portfinder");
var os = require("os");
var colors = require("colors/safe");
var http = require("http");
var https = require("https");
var WSServer = require("./dist/server/WSServerClient").default;
var DebugServer = require("./dist/server/DebugServer").default;
var WebSocketServer = require("ws").Server;
var { createProxyMiddleware } = require('http-proxy-middleware');
var fs = require("fs");
var netFaces = os.networkInterfaces();
var crypto = require("crypto");

function createCert() {

    var certPath = "./generated-cert-1";

    if(fs.existsSync(certPath)) {
        return JSON.parse(fs.readFileSync(certPath, { encoding: "utf8", flag: "r" }));
    }

    var forge = require('node-forge');
    var pki = forge.pki;

    // generate a key pair or use one you have already
    var keys = pki.rsa.generateKeyPair(2048);

    // create a new certificate
    var cert = pki.createCertificate();

    // fill the required fields
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 20);

    // use your own attributes here, or supply a csr (check the docs)
    var attrs = [{
    name: 'commonName',
    value: 'dev.web-atoms.in'
    }, {
    name: 'countryName',
    value: 'IN'
    }, {
    shortName: 'ST',
    value: 'Maharashtra'
    }, {
    name: 'localityName',
    value: 'Navi Mumbai'
    }, {
    name: 'organizationName',
    value: 'NeuroSpeech Technologies Pvt Ltd'
    }, {
    shortName: 'OU',
    value: 'Test'
    }];

    // here we set subject and issuer as the same one
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // the actual certificate signing
    cert.sign(keys.privateKey);

    // now convert the Forge certificate to PEM format
    var pem = pki.certificateToPem(cert);
    var pkey = pki.privateKeyToPem(keys.privateKey)
    var c = { key: pkey, cert: pem };

    fs.writeFileSync( certPath, JSON.stringify(c), "utf8");
    return c;
}

function listen(port, ssl) {

    var proxyHost = process.argv.find((s) => /^(http|https)\:\/\//.test(s));

    if (proxyHost) {
        var apiProxy = createProxyMiddleware(
            (pathName) => pathName !== "/__debug" && pathName !== "/__listen",
            {
                target: proxyHost,
                changeOrigin: true,
                ws: true,
                cookieDomainRewrite: "",
                onProxyRes: (proxyReq, req, res) => {

                    if (proxyReq.statusCode > 300) {
                        console.error(colors.red(`HTTP STATUS ${proxyReq.statusCode} for ${proxyHost}${req.url}`));
                    }

                    var cookie = proxyReq.headers["set-cookie"];
                    if (cookie) {
                        cookie = cookie.map((s) => s.replace("secure;", "") );
                        proxyReq.headers["set-cookie"] = cookie;
                    }
                }
            });

        app.default.use(apiProxy);
    }
    var server = ssl ? https.createServer(createCert(), app.default) : http.createServer(app.default);

    var wss = new WebSocketServer({ server: server, path: "/__listen" });

    // const dss = new WebSocketServer({ server: server, path: "/__debug" });
    // DebugServer.configure(dss);
    WSServer.configure(wss);    

    server.listen(port,(err) => {
        if(err) {
            return console.log(err);
        }

        Object.keys(netFaces).forEach(function (dev) {
            netFaces[dev].forEach(function (details) {
              if (details.family === 'IPv4') {
                  if (ssl) {
                    console.log(('  https://' + details.address + ':' + colors.cyan(port.toString())));
                  } else {
                    console.log(('  http://' + details.address + ':' + colors.cyan(port.toString())));
                  }
              }
            });
          });
        
        
        return console.log(colors.green("Server has started "));
    });
}

portfinder.basePort = 8080;
portfinder.getPort(function (err, port) {
    if (err) { 
        throw err; 
    }
    listen(port);
});
portfinder.getPort(function (err, port) {
    if (err) { 
        throw err; 
    }
    listen(port, true);
});

