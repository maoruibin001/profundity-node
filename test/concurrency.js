/**
 * Created by lenovo on 2017/6/23.
 */
const fs = require('fs');
var buf = new Buffer(1024);

function readFile(path) {
    fs.open(path,'r+', function(err, fd) {
        fs.ftruncate(fd, 20, function (err) {
            // fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            //     console.log(bytes)
            //     if (bytes >0 ) {
            //         console.log(buf.slice(0, bytes).toString());
            //     }
            //     fs.close(fd, function(err) {
            //         if (err) {
            //             console.log(err)
            //             return;
            //         }
            //
            //         console.log('close file success')
            //     })
            // })
        });
    });
}

for (let i = 0; i < 2; i ++) {
    readFile('./hello.txt')
}
