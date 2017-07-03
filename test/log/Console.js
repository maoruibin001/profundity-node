/**
 * Created by lenovo on 2017/7/3.
 */
const util = require('util');
const fs = require('fs');
console.Console.prototype.log = function() {
    console.log('this: ', this);
    console.log(util.format.apply(null, arguments))
    this._stdout.write(util.format.apply(null, arguments) + '\n');
};
console.Console.prototype.warn = function() {
    this._stderr.write(util.format.apply(this, arguments) + '\n');
};
console.Console.prototype.error = function() {
    this._stderr.write(util.format.apply(this, arguments) + '\n');
};



const logdir = __dirname;
var info = fs.createWriteStream(logdir + '/info.log', {flags: 'a', mode: '0666'});
var error = fs.createWriteStream(logdir + '/error.log', {flags: 'a', mode: '0666'});
var logger = new console.Console(info, error);

logger.log('Hello world!');