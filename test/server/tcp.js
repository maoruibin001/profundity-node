/**
 * Created by lenovo on 2017/6/26.
 */
const net = require('net');

net.createServer(function(socket) {
    socket.setEncoding('utf8')
    socket.on('data', function(data) {
        console.log(data);

        socket.write('你好');
    });
    socket.on('end', function() {
        console.log('end');
    })
}).listen(8790);
console.log('server start at: 8790')