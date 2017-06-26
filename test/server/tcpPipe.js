/**
 * Created by lenovo on 2017/6/26.
 */
var net = require('net');
var server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
    console.log(socket)
    socket.on('data', function(data) {
        console.log(data.toString());
    })
});

server.listen(1337, '127.0.0.1');