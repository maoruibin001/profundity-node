/**
 * Created by lenovo on 2017/6/26.
 */
const fs = require('fs');

const read = fs.createReadStream('hello.txt');
read.setEncoding('utf8');

read.on('data', function(chunk) {
    console.log(chunk);
})


var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var buf1 = new Buffer([0xE5, 0xBA, 0x8A, 0xE5, 0x89, 0x8D, 0xE6, 0x98, 0x8E, 0xE6, 0x9C]);
console.log(decoder.write(buf1))
var buf2 = new Buffer([0x88, 0xE5, 0x85, 0x89, 0xEF, 0xBC, 0x8C, 0xE7, 0x96, 0x91, 0xE6]);
// console.log(buf2.toString());
console.log(decoder.write(buf2))