/**
 * Created by lenovo on 2017/7/3.
 */
var cluster = require('cluster');
cluster.setupMaster({
    exec: "worker.js"
});
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
    cluster.fork();
}