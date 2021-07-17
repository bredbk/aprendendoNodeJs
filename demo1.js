var http = require('http');
http.createServer(function(req,res){
    res.write("Hello Word! Welcome to this tutorial");
    res.end();
}).listen(8080);