const compute = require('./compute');
const connection = require('./connection')
var UDPPORT = 4005;
const speed = 1000;
var clone = '';
var _ = require('lodash');
const dgram = require('dgram');
let serverudp = dgram.createSocket('udp4');
//绑定端口和主机地址
serverudp.bind(UDPPORT);
//UDP服务器部分start
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
global.data = {};

serverudp.on('close', () => {
    console.log('udp已关闭');
});

serverudp.on('error', (err) => {
    console.log(err);
});

serverudp.on('listening', () => {
    console.log('udp正在监听中...');
});

serverudp.on('message', (msg, rinfo) => {
    let xarry = {};
    connection(msg, rinfo, xarry);
    //判断数据是否更新了
    if (clone !== xarry) {
        compute(xarry);
        clone = _.cloneDeep(xarry);
    }
});


//UDP服务器部分end
//ws start
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.on('error', function incoming(error) {
        console.log('error', error);
    });
    ws.on('close', function incoming(err) {
        console.log('close: %s', err);
    });

    setTimeout(() => {
        getData(ws);
    }, speed);
});
const getData = (ws) => {
        console.log(global.data);
        ws.send(JSON.stringify(global.data));

        setTimeout(() => {
            getData(ws);
        }, speed);
    }
    //ws end