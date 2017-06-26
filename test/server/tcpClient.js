/**
 * Created by lenovo on 2017/6/26.
 */
const net = require('net');

const client = net.connect({port: 8790});

client.write('hello you 啊')
client.on('data', function(data) {
    console.log('client start')
    console.log(data.toString());
});

client.on('end', function() {
    console.log('client end');
});