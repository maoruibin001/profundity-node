/**
 * Created by lenovo on 2017/6/22.
 */
var events = require('events');
const observer = new events.EventEmitter();

var status = 'ready';
function select(cb) {
    observer.once('ok', cb);

    if (status === 'ready') {
        console.log('进入啦，pending')
        status = 'pending';
        setTimeout(function() {
            var data = {name: 'mao'};
            status = 'ready';
            observer.emit('ok', data);
        }, 1000);
    }

}
console.log('emitter: ', observer)
observer.setMaxListeners(0);
for (var i = 0; i < 20; i ++) {
    select(function(data) {
        console.log(data);
    })
}
