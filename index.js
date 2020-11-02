const Koa = require('koa');
// 路由
const route = require('koa-route');
// koa封装的websocket这是官网（很简单有时间去看一下https://www.npmjs.com/package/koa-websocket）
const websockify = require('koa-websocket');

const app = websockify(new Koa());
const trilateration = require('trilateration');
app.ws.use(function(ctx, next) {
    return next(ctx);
});
app.listen(3002, () => {
    console.log('3002端口启动成功');
});
var locationArray = [{ x: 1.44 + 1, y: 1.75 + 1 }, { x: 0 + 1, y: 2.88 + 1 }, { x: -1.586 + 1, y: 0 + 1 }, { x: 0 + 1, y: -1.56 + 1 }];
var locacc = [];
var locdistance = [2.26, 2.88, 1.59, 1.56];
var distanceacc = '';
var pingjunshu = 4;

//对四个基站进行排列组合得到数据
var UDPPORT = 4003;
//locationlist是收录locdistance这种[2.26, 2.88, 1.59, 1.56]，并不对这个进行排列
//loclist可以用来存储计算后得出的xy坐标
//未来新增一个用于存储可能的滤波

var dataArray111 = {
    id: '1111111',
    adistance: [],
    bdistance: [],
    cdistance: [],
    ddistance: [],
    locationlist: [],
    loclist: [],
    fulterlist: [],
    x: '',
    y: ''
};
var dataArray222 = {
    id: '2222222',
    adistance: [],
    bdistance: [],
    cdistance: [],
    ddistance: [],
    locationlist: [],
    loclist: [],
    fulterlist: [],
    x: '',
    y: ''
};
var dataArray = [dataArray111, dataArray222];
//这是四个基站坐标的矩阵
for (let i = locationArray.length - 1; i >= 0; i--) {
    let linshi = [];
    locationArray.forEach((element) => {
        if (element != locationArray[i]) {
            linshi.push(element);
        }
    })
    locacc.push(linshi);
}
const dgram = require('dgram');
let serverudp = dgram.createSocket('udp4');
//绑定端口和主机地址
serverudp.bind(UDPPORT);
//UDP服务器部分start
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
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
    //console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    const cent = Buffer.from(msg);
    let jsondata = decoder.write(cent);
    //console.log(jsondata); //打印出了对象形式，且转换完整
    let jsondatad = /TDOA/;
    let ID = /ID/;
    let TagID = /TagID/;
    let Distance = /Distance/;
    let packnumber = /packnumber/;
    let num = /-/;
    const jsonflag = jsondatad.test(jsondata);
    const TagIDflag = TagID.test(jsondata);
    const Distanceflag = Distance.test(jsondata);
    const packnumberflag = packnumber.test(jsondata);
    const numflag = num.test(jsondata);
    //console.log(numflag);
    if (jsonflag && TagIDflag && Distanceflag && packnumberflag && !numflag) {
        let strjson = jsondata.split(" ");
        //console.log(strjson);
        let strjson2 = strjson[1].slice(0, strjson[1].length - 2);
        //console.log(strjson2);
        const match = strjson2.match(/(?<=:).*?(?=,)/g);
        const packnumber = strjson2.match(/(?<=packnumber:).*?(?=])/g);
        const distancezhengfu = match[3];
        const disatanceff = parseFloat(distancezhengfu);
        //还需要写一个勾股定理写的原理
        let xarry = {
            id: TagID,
            locdistance: '',
            locnumber: '',
            locid: ''
        };
        //就是各种推数据进入xarry
        //判断属于哪个标签id进行推送


        dataArray.forEach(function(element) {
            //提前组成一个遍历的数组，里面包含所有的标签，
            //即可实现遍历整个数组内的所有标签，节约代码行数

            if (xarry.id == element.id) {
                if (xarry.locid == 'wangluo1') {
                    element.adistance.push(xarry.locdistance);
                } else if (xarry.locid == 'wangluo2') {
                    element.bdistance.push(xarry.locdistance);
                } else if (xarry.locid == 'wangluo3') {
                    element.cdistance.push(xarry.locdistance);
                } else if (xarry.locid == 'wangluo4') {
                    element.ddistance.push(xarry.locdistance);
                }
            }
            //此为截止长度
        });

    }
});

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
    dataArray.forEach((element) => {
        //先对各个数组进行排序
        locAcc(element);
        element.fulterlist.push(xy);
    })
    ws.send(JSON.stringify(dataArray));
    setTimeout(() => {
        getData(ws);

    }, speed);
}

function bianli() {

}


function locAcc(element) {
    //建立距离的数组

    if (element.adistance.length == element.bdistance.length == element.cdistance.length == element.ddistance.length) {
        locdistance = [element.adistance.slice(-1), element.bdistance.slice(-1), element.cdistance.slice(-1), element.ddistance.slice(-1)];
    } else {
        //如果面临数组长度不一样的情况，以主基站即A基站为准
        let alength = element.adistance.length - 1;
        locdistance = [element.adistance.slice(-2, -1), element.bdistance[alength - 1], element.cdistance[alength - 1], element.ddistance[alength - 1]];
    }
    //建立距离的数组矩阵
    distanceacc = [];
    for (let i = locdistance.length - 1; i >= 0; i--) {
        let linshi = [];
        locdistance.forEach((element) => {
            if (element != locdistance[i]) {
                linshi.push(element);
            }
        })
        distanceacc.push(linshi);
    }
    element.locationlist.push(distanceacc);
    let z = 0;
    let x = 0;
    let y = 0;
    //四边测距算法
    locacc.forEach((item) => {
        trilateration.addBeacon(0, trilateration.vector(item[0].x, item[0].y));
        trilateration.addBeacon(1, trilateration.vector(item[1].x, item[1].y));
        trilateration.addBeacon(2, trilateration.vector(item[2].x, item[2].y));
        trilateration.setDistance(0, distanceacc[z][0]);
        trilateration.setDistance(1, distanceacc[z][1]);
        trilateration.setDistance(2, distanceacc[z][2]);
        let pos = trilateration.calculatePosition();
        x += pos.x;
        y += pos.y;
        z++;
    })
    x = x / pingjunshu;
    y = y / pingjunshu;
    element.x = x;
    element.y = y;
    let lo = {
        x: x,
        y: y
    };
    element.loclist.push(lo);
    console.log("X: " + x + "; Y: " + y);
}



//对四个基站的距离进行计算



function compute() {

}

//排序函数
function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}