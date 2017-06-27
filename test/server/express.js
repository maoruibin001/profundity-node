const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(function(req, res, next) {
    console.log(req.path);
    console.log(/\.js$ |\.css$/.test(req.path));
    if (/\.js$ |\.css$/.test(req.path)) {
        console.log('hahahah')
        res.setHeader('cache-control', 'max-age=200003');
    } else {
        console.log('woqu')
    }
    res.sendFile(path.join(__dirname, '..', req.path));
});
app.get('/', function (req, res) {
    console.log(333333333);
    // res.setHeader('Cache-Control', 'max-age=20000')
    res.sendFile(path.resolve(__dirname, '../2.html'));
});
app.listen(7600, function() {
    console.log('start server')
});