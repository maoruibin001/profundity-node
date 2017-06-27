/**
 * Created by lenovo on 2017/6/26.
 */
const url = require('url');
const querystring = require('querystring');

const str = 'www.baidu.com?foo=bar&foo=kk';

console.log(querystring.parse(url.parse(str).query));