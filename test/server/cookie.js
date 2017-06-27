/**
 * Created by lenovo on 2017/6/26.
 */
var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encodeURI(val)];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join('; ');
};

var handle = function (req, res) {
    if (!req.cookies.isVisit) {
        res.setHeader('Set-Cookie', serialize('isVisit', '1', {httpOnly: true}));
        res.writeHead(200);
        res.write('<head><meta charset="utf-8"></head>');
        res.end("欢迎");
        // res.end('hello 1');
    } else {

        res.write('<head><meta charset="utf-8"></head>');
        res.end("欢迎2");
        res.end('hello 2');
    }
};

const http = require('http');

var parseCookie = function (cookie) {
    var cookies = {};
    if (!cookie) {
        return cookies;
    }
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split('=');
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
};

http.createServer(function (req, res) {
    res.setHeader('content-type', 'text/html');
    req.cookies = parseCookie(req.headers.cookie);
    handle(req, res);
}).listen(2270);