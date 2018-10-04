var app = require("./dist/server/WebServer");
var process = require("process");

var port = process.env.PORT || 8080;

app.default.listen(port,(err) => {
    if(err) {
        return console.log(err);
    }
    
    return console.log("Server is running on " + port);
});