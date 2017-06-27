/**
 * Created by lenovo on 2017/6/26.
 */
var http = require('http');
var EventEmitter = require('evnets').EventEmitter;
var net = require('net');
var util = require('util');

var Agent = function(optinos)
{
    var self = this;
    // 选项配置
    self.options  = options || {};
    // 保存请求的全部hostname
    self.requests = {};
    // 创建的socket连接数
    self.sockets = {};
    // 未被使用的socket
    self.unusedSockets = {};
    // socket的最大连接数量
    self.maxSockets = self.options.maxSockets || Agent.defaultMaxSockets;
    self.on('free',function(socket,host,port){
        var hostname = host + ':' + port;
        // 如果有正在请求的主机
        if(self.requests[hostname] && self.requests[hostname].length)
        {
            self.requests[hostname].shift().onSocket(socket);
        }
        else
        {
            // 如果没有请求数就销毁socket连接并从连接池移除
            if(!self.unusedSockets[hostname])
            {
                self.unusedSockets[hostname] = [];
            }
            self.unusedSockets[hostname].push(socket);
        }
    });
    self.createConnection = net.createConnection;
};
util.inherits(Agent,EventEmitter);

Agent.defaultMaxSockets = 10;

Agent.prototype.defaultPort = 80;

Agent.prototype.addRequest = function(req,host,port)
{
    var hostname = host + ':' + port;
    if(this.unusedSockets[hostname] && this.unusedSockets[hostname].length)
    {
        req.onSocket(this.unusedSockets[hostname].shift());
        return;
    }
    if(!this.sockets[hostname])
    {
        this.sockets[hostname] = [];
    }
    if(this.sockets[hostname].length < this.maxSockets)
    {
        req.onSocket(this.createSocket(hostname,host,port));
    }
    else
    {
        if(!this.requests[hostname])
        {
            this.requests[hostname] = [];
        }
        this.requests[hostname].push(req);
    }
};

Agent.prototype.createSocket = function(name, host, port) {
    var self = this;
    var s = self.createConnection(port, host, self.options);
    if (!self.sockets[name]) {
        self.sockets[name] = [];
    }
    this.sockets[name].push(s);
    var onFree = function() {
        self.emit('free', s, host, port);
    }
    s.on('free', onFree);
    var onClose = function(err) {
        // 这是唯一移除socket代理的地方，如果你想从连接池中移除socket，就关闭连接，所有的socket错误会导致连接关闭
        self.removeSocket(s, name, host, port);
    }
    s.on('close', onClose);
    var onRemove = function() {
        // We need this function for cases like HTTP "upgrade"
        // (defined by WebSockets) where we need to remove a socket from the pool
        //  because it'll be locked up indefinitely
        self.removeSocket(s, name, host, port);
        s.removeListener('close', onClose);
        s.removeListener('free', onFree);
        s.removeListener('agentRemove', onRemove);
    }
    s.on('agentRemove', onRemove);
    return s;
};
Agent.prototype.removeSocket = function(s, name, host, port) {
    if (this.sockets[name]) {
        var index = this.sockets[name].indexOf(s);
        if (index !== -1) {
            this.sockets[name].splice(index, 1);
        }
    } else if (this.sockets[name] && this.sockets[name].length === 0) {
        delete this.sockets[name];
        delete this.requests[name];
    }
    if (this.requests[name] && this.requests[name].length) {
        // If we have pending requests and a socket gets closed a new one
        // needs to be created to take over in the pool for the one that closed.
        this.createSocket(name, host, port).emit('free');
    }
};


var agent = new Agent({ maxSockets: 100 });
// Optionally define more parallel sockets
var options = {
    agent: agent,
    hostname: '127.0.0.1',
    port: 2220,
    path: '/'
};
// do get
http.get(options);
// do request
http.request(options,function(){});