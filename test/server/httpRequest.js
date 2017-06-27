/**
 * Created by lenovo on 2017/6/26.
 */
const http = require('http');

let config = {
    host: '127.0.0.1',
    port: 2220,
    method: 'get',
    timeout: 3
}
let request = http.request(config, function (res) {
    console.log();
    res.timeout = 3;
    res.on('data', function(data) {
        console.log(data.toString());
    });
    console.log(res.sockets);
});

request.end();