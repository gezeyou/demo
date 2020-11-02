//整篇拷贝版本
//9月10日目前解决的版本是callback带回的参数深拷贝问题
var UDPPORT = 4003;
let xarry = {
    distance: '',
    distance16: '', //距离
    tagip: '', //ip地址
    id: '', //标签id
    flag: '' //此次信息的标志位
};


var data = [];
var zhuloc = '192.168.100.51';
// const fun = (xarry) => {
//     console.log('接到的数据', xarry);
// };
var dataflag = '';
var id = '';
const dgram = require('dgram');
let serverudp = dgram.createSocket('udp4');
//用于深拷贝的插件
var _ = require('lodash');
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
    let cenflag = /07a0/;
    let centflag = cenflag.test(cent);

    if (centflag) {
        console.log(cent);
        let str = cent.match(/07a0(\S*)/)[1];
        const strforst = cent.match(/(\S*)07a0/)[1];
        const idflag = strforst.substring(strforst.length - 4, strforst.length);
        const id = idflag.substring(0, 2);
        const flag = idflag.substring(2, 4);
        str = str.substring(0, 4);
        //console.log('substring' + str);
        const result = parseInt(str, 16);
        //console.log(result);
        const distance16 = str;
        xarry.distance16 = distance16;
        xarry.distance = result;
        xarry.tagip = rinfo.address;
        xarry.id = id;
        xarry.flag = flag;
        //console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
        //chuli(xarry);
    }

});
var da = '';

function chuli(xarry) {
    //标签为111时推送,目前暂时为时间戳的方案，packnumber暂时不推入
    da = _.cloneDeep(xarry);
    console.log(data);
    if (id.length !== null) {
        //不为空后，就是依次的推入数据
        //计算当前的id和flag是不是不一样
        if (da.id == id) {
            data.push(da);
            //console.log(data);
        } else {
            //当前的id发生改变后，
            //检验当前的data数组是否符合条件大于3并发送
            if (data.length >= 3) {
                //发送并清空
                //send();
                //sendMessage(data);
                dataflag = da.flag;
                id = da.id;
                data = [];
                data.push(da);
            } else { //发送完成后进行标志位和标签id的重置
                //试用复位函数
                //reset();
                dataflag = da.flag;
                id = da.id;
                data = [];
                data.push(da);
            }

        }

    } else {
        //试用复位函数
        //reset();
        dataflag = da.flag;
        id = da.id;
        data.push(da);
    }
}