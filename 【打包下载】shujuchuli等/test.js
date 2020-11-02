// let data = 'ABXMgBEAAAA0AQAADHtTB6ACiZIBAxZNHQ==';
let data = 'ABDMAREAAABFFgEAAwAAAAAAbeE=';
let bu = Buffer.from(data, 'base64');
let t = bu.toString('hex');

console.log(t);

var UDPPORT = 4008;
var i = 0;
let xarry = {
    distance: '',
    distance16: '',
    tagip: ''

};
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
    //str是距离的16进制值
    //result是距离的十进制值
    let asd = msg.toString();
    //console.log(asd);
    let buff = Buffer.from(asd, 'base64');
    let cent = buff.toString('hex');
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    console.log(cent);
    let cenflag = /07a0/;
    let centflag = cenflag.test(cent);

    if (centflag) {
        let str = cent.match(/07a0(\S*)/)[1];
        str = str.substring(0, 4);
        //console.log('substring' + str);
        const result = parseInt(str, 16);
        //console.log(result);
        const distance16 = str;
        xarry.distance16 = distance16;
        xarry.distance = result;
        xarry.tagip = rinfo.address;

        //console.log(xarry);
    }

    // callback(xarry);
});

function caca(cent) {


}
//console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');