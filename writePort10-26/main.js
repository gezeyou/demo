const connection = require('./connection');
const compute = require('./compute');
var UDPPORT = 4004;
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
var foot = '';
var ipAddress = '';
var strAll = '';
var zhanbao = 0;
var duanbao = 0;
var normal = 0;
var ip = {
    locip1: 4005,
    locip2: 4006,
    locip3: 4007,
    locip4: 4008,
    locip5: 4009,
    locip6: 4010,
    locip7: 4011,
    locipziji: 4012
}
var fileDirname = {
    locip1: './4005.txt',
    locip2: './4006.txt',
    locip3: './4007.txt',
    locip4: './4008.txt',
    locip5: './4009.txt',
    locip6: './4010.txt',
    locip7: './4011.txt',
    locipziji: './4012.txt',
}
var ipAttitude = {
    locip1: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip2: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip3: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip4: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip5: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip6: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
    locip7: {
        normal: 0,
        duanabo: 0,
        zhanbao: 0
    },
}
var ipnormal = 'normal';
var ipduanbao = 'duanbao';
var ipzhanbao = 'zhanbao';
global.data = {};
//绑定端口和主机地址
serverudp.bind(UDPPORT);
//UDP服务器部分start
const { StringDecoder } = require('string_decoder');
const { del } = require('koa-route');
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
var oldBuffer = null;
var buff = '';
const writeSpeed = 1000 * 60; //写入速度
serverudp.on('message', (msg, rinfo) => {
    //接收数据，进行转化start
    //console.log('msg：' + msg);
    /**通过检测首尾两位和中间是否出现过02/03
     * 1头出现02，尾没有03
     * 2头尾都有02和03，但是中间会有两个0203也就是粘包
     * 3头没有02，尾部有03，也就是断包**/
    //先处理断包，因为很好处理
    const headTesthead = msg.indexOf(02);
    const headTestfoot = msg.lastIndexOf(02);
    const footTesthead = msg.indexOf(03);
    const footTestfoot = msg.lastIndexOf(03);
    console.log('msg')
    console.log(msg);
    //头部没有02
    if (headTesthead === -1) {
        console.log('剩下的半包来了:' + msg);
        if (oldBuffer && footTesthead === 0) {
            msg = Buffer.concat([oldBuffer, msg]);
            oldBuffer = null;
            console.log(msg);
            buff = msg;
            connection(buff, foot, rinfo, xarry);
            //记录id和实际情况
            transform()
        }
    }
    //尾部没有03
    if (footTesthead === -1 && headTesthead === 0) {
        oldBuffer = msg;
        console.log('断包了:' + oldBuffer);
        connection(buff, foot, rinfo, xarry);
        xarry.attitude = 'duanbao'
            //记录id和实际情况
            //compute(xarry);
        duanbao++;
        jungleAttitude()
        return
    }
    //出现了两次02
    if (!(headTesthead === headTestfoot)) {
        //进入两个02也就是粘包
        console.log('粘包第一次：' + headTesthead + '粘包第二次：' + headTestfoot);
        const buffhead = msg.slice(headTesthead, headTestfoot);
        console.log(buffhead);
        const bufffoot = msg.slice(headTestfoot, msg.length);
        console.log(bufffoot);
        buff = buffhead;
        foot = bufffoot;
        connection(buff, foot, rinfo, xarry);
        foot = '';
        xarry.attitude = 'zhanbao'
            //compute(xarry);
            //console.log(xarry);
        transform();
        jungleAttitude()
        zhanbao++
    }
    if (headTesthead === 0 && headTesthead === headTestfoot && footTesthead === footTestfoot) {
        console.log('进入正常情况')
        buff = msg;
        connection(buff, foot, rinfo, xarry);
        xarry.attitude = 'normal'
            //compute(xarry);
        normal++;
        // console.log(xarry);
        transform();
        jungleAttitude()
    }
    // setTimeout(() => {
    //     writeData();
    // }, speed);

    console.log('断包：' + duanbao + '粘包：' + zhanbao + '正常情况：' + normal);
});
//结束写入start
const writeFileDirname = './result.txt';

function writeDataFn() {
    return new Promise((resolve, reject) => {
        fs.writeFile(writeFileDirname, JSON.stringify(global.data) + '\n', { 'flag': 'a' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(console.log(writeFileDirname + '写入完成'));
        });
    })
}
/**分别对各自的txt文档，断包做判别，
 * 分别进行计数**/

function jungleAttitude() {
    if (xarry.attitude === ipnormal) {
        Object.keys(ip).forEach(function(key) {
            if (ip[key] === xarry.ipAddress) {
                ipAttitude[key][normal]++
            }
        })
    }
    if (xarry.attitude === ipduanbao) {
        Object.keys(ip).forEach(function(key) {
            if (ip[key] === xarry.ipAddress) {
                ipAttitude[key][duanbao]++
            }
        })
    }
    if (xarry.attitude === ipzhanbao) {
        Object.keys(ip).forEach(function(key) {
            if (ip[key] === xarry.ipAddress) {
                ipAttitude[key][zhanbao]++
                    console.log(ipAttitude[key][zhanbao])
            }
        })
    }
}


// const writeData = () => {
//         //写入
//         startwriteData();
//         console.log(global.data);
//         setTimeout(() => {
//             writeData();
//         }, writeSpeed)
//     }
//结束end
async function startwriteData() {
    await writeDataFn()
}

function write() {

    Object.keys(ip).forEach(function(key) {

        if (ip[key] == str.ipAddress) {
            return new Promise((resolve, reject) => {
                fs.writeFile(fileDirname[key], strAll + '\n', { 'flag': 'a' }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(console.log(fileDirname[key] + '写入完成'));
                });

            })
        }
    })
}
//开始编译
function transform() {
    if (xarry.buffer.length > 0) {
        //console.log('开始编译');
        str = _.cloneDeep(xarry);
        const strtest = 'bufferfoot';
        console.log('str');
        console.log(str);
        if (str.hasOwnProperty(strtest)) {
            if (str.bufferfoot.length > 0) {
                console.log('粘包的情况');
                strAll = _.cloneDeep(str.buffer) + '\n' + _.cloneDeep(str.bufferfoot);
            } else {
                //取代方案，看能不能用return来进入之前的外循环
                strAll = _.cloneDeep(str.buffer);
            }
        } else {
            strAll = _.cloneDeep(str.buffer);
            console.log('strAll单一:' + strAll);
        }
        start();
        xarry.buffer = '';
        xarry.bufferfoot = '';
    }
}

async function start() {
    //forEach遍历数组
    //然后进入遍历，同时将文件名也作为数组
    //forin对象比较好，可以再文件名直接查找
    await write();
    //await dele();
}
//UDP服务器部分end