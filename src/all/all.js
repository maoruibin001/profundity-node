/**
 * Created by lenovo on 2017/6/22.
 */
const EventEmitter = require('events').EventEmitter;

EventEmitter.prototype.all = all;
var proxy = new EventEmitter();
// proxy.all = all;

proxy.all('a','b', function(data) {
    console.log(data);
});

function all() {
    var args = [].slice.call(arguments),
        cb = args.pop(),
        eventList = args,
        cache = [];
    this.on('all', cb);
    var after = function(times, cb) {
        var cache = {}, _times = 0;
       return function(key, value) {
           if (arguments.length <= 1) {
               value = key;
               key = _times;
           }
           cache[key] = value;
           if (++_times === times) {
               return cb(cache);
           }

       }
    }
    var done = after(eventList.length, function(data) {
        this.emit('all', data);
    }.bind(this))
    for (var i = eventList.length - 1; i >= 0; --i) {
        this.on(eventList[i], done);
    }
}
proxy.emit('a',  {name: 'mao'});
proxy.emit('b',  {name: 'rui'});

