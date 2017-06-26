/**
 * Created by lenovo on 2017/6/26.
 */
const http = require('http');

http.createServer(function (req, res) {
    res.setHeader('content-type', 'text/plain');
    res.end('hello world');
}).listen(2230);