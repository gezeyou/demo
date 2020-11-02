const connection = require('./connection')
var UDPPORT = 4003;
const speed = 1000;
var clone = '';
var _ = require('lodash');
const dgram = require('dgram');
let serverudp = dgram.createSocket('udp4');
let fs = require('fs');
var i = 0;
var j = 0;
var str = '';
let xarry = {};
var ipAddress = '';
var ip = {
        locip1: "192.168.100.47",
        locip2: "192.168.100.68",
        locip3: "192.168.100.69",
        locipziji: "192.168.100.195"
    }
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
    //接收数据，进行转化start
    //console.log('msg：' + msg);
    i++;
    connection(msg, rinfo, xarry);
    console.log(xarry);
    //接收数据，进行转化end
    //缓冲去start
    //缓冲区end
    //开始写入start

    if (xarry.buffer !== null) {
        xarry.ipAddress = rinfo.address
        str = _.cloneDeep(xarry);
        start();
    }
    //开始写入end

    //编译包
    //写入
});
//结束写入start
//结束end
function write1() {
    if (str.ipAddress == ip.locip1) {
        return new Promise((resolve, reject) => {
            fs.writeFile('./1.txt', str.buffer + '\n', { 'flag': 'a' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(console.log('1.txt写入完成'))
            });

        })
    }

}

function write2() {
    if (str.ipAddress == ip.locip2) {
        return new Promise((resolve, reject) => {
            fs.writeFile('./2.txt', str.buffer + '\n', { 'flag': 'a' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(console.log('2.txt写入完成'))
            });

        })
    }

}

function write3() {
    if (str.ipAddress == ip.locip3) {
        return new Promise((resolve, reject) => {
            fs.writeFile('./3.txt', str.buffer + '\n', { 'flag': 'a' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(console.log('3.txt写入完成'))
            });

        })
    }

}

function writeZiji() {
    if (str.ipAddress == ip.locipziji) {
        return new Promise((resolve, reject) => {
            fs.writeFile('./4.txt', str.buffer + '\n', { 'flag': 'a' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(console.log('ziji.txt写入完成'))
            });

        })
    }

}
async function start() {
    //forEach遍历数组
    await write1();
    await write2();
    await write3();
    await writeZiji();
}
//UDP服务器部分end