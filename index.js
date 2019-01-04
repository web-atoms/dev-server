var app = require("./dist/server/WebServer");
var process = require("process");
var portfinder = require("portfinder");
var os = require("os");
var colors = require("colors/safe");
var http = require("http");
var WSServer = require("./dist/server/WSServer").default;
var WebSocketServer = require("ws").Server;
var proxy = require('http-proxy-middleware');
var ifaces = os.networkInterfaces();

function listen(port) {

    var apiProxy = proxy(
        (pathName) => pathName !== "/listen",
        {
            target: process.argv[2],
            changeOrigin: true,
            ws: true,
            cookieDomainRewrite: "",
            onProxyRes: (proxyReq, req, res) => {
                var cookie = proxyReq.headers["set-cookie"];
                if (cookie) {
                    cookie = cookie.map((s) => s.replace("secure;", "") );
                    proxyReq.headers["set-cookie"] = cookie;
                }
            }
        });

    app.default.use(apiProxy);

    var server = http.createServer(app.default);

    var wss = new WebSocketServer({ server: server, path: "/listen" });

    WSServer.configure(wss);    

    server.listen(port,(err) => {
        if(err) {
            return console.log(err);
        }

        Object.keys(ifaces).forEach(function (dev) {
            ifaces[dev].forEach(function (details) {
              if (details.family === 'IPv4') {
                console.log(('  http://' + details.address + ':' + colors.green(port.toString())));
              }
            });
          });
        
        
        return console.log("Server has started ");
    });
}

portfinder.basePort = 8080;
portfinder.getPort(function (err, port) {
    if (err) { 
        throw err; 
    }
    listen(port);
});