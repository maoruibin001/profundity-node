/**
 * Created by lenovo on 2017/7/3.
 */
console.log('ttt')
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
// cluster.setupMaster({
//     exec: "worker.js"
// });

if (cluster.isMaster) {
// Fork workers
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // console.log( cluster.fork())
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
// Workers can share any TCP connection
// In this case its a HTTP server
    console.log('aaa')
    http.createServer(function(req, res) {
        console.log(333)
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}