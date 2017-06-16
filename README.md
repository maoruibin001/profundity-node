# 深入浅出nodejs

## 目录结构
```
+file   静态文件存放路径
+mock   mock数据存放目录
+src    源代码上传目录
+www    server目录
```

## 注意事项
* JS统一使用ES6语法
* 需全局安装hotnode和node-inspector

## 第三方库参考文档
* hotnode           https://www.npmjs.com/search?q=hotnode
* node-inspector    http://jingyan.baidu.com/article/dca1fa6fbd580ff1a44052de.html
* express           https://www.npmjs.com/package/express


## 依赖安装
* 安装node
* 安装全局的npm
* 安装工程依赖
```
cd path/to/project
npm install
```

## 运行
* 运行一个热重启服务器并调试
```
npm run simply
```

## 注：

* 要调试，需要先打开命令行，运行
```
node-inspector &
```
* 如果接口被占用，需要运行
```
node-inspector --web-port=<port> &
```
