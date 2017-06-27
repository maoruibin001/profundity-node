/**
 * Created by lenovo on 2017/6/26.
 */
const http = require('http');

http.createServer(function (req, res) {
    res.setHeader('content-type', 'text/html');
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('你好');
}).listen(2220);