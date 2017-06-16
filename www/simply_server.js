/**
 * Created by lenovo on 2017/6/16.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');

var app = express();


app.use(function(req, res, next) {
    const mockFile = path.resolve(__dirname, '../mock/' + req.url);
    if (fs.existsSync(mockFile)) {
        const stat = fs.statSync(mockFile);
        if (stat.isFile()) {
            let readStream = fs.createReadStream(mockFile);
            res.writeHead(202, {
                'Content-Type': 'text/html;charset=UTF-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Length': fs.statSync(mockFile).size
            });
            readStream.pipe(res);
        } else {
            res.status(404);
            res.json('404 MOCK SHOULD NOT BE DIRECTORY')
        }


    } else {
        res.status(404);
        try {
            return res.json('NOT FOUND');
        } catch (e) {
            console.log('404 SET HEADER AFTER SENT');
        }
    }
});

app.use(function(err, req, res, next) {
    if (!err) {
        next();
    } else {
        res.status(500);
        try {
            return res.json('SERVER ERROR');
        } catch (e) {
            console.log('500 SET HEADER AFTER SENT');
        }
    }
})

app.listen(8805, function() {
    console.log('server start at: localhost:8805')
})