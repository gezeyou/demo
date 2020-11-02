let shuju = '0015cc8011000000340100000c7b5307a00289920103164d1d';
let str = shuju.match(/07a0(\S*)/)[1];
const strforst = shuju.match(/(\S*)07a0/)[1];
const strfff = strforst.substring(strforst.length - 6, strforst.length);
const strf = strfff.substring(0, 4);
const biaozhi = strfff.substring(4, 6);

const strin = str.substring(0, 4);

let data = 'ABXMgBEAAAAVAQAADRRxB6AAWJQBAxbr6w==ABDMAREAAAAVfgEAAwAAAAAAWrc=';
let bu = Buffer.from(data, 'base64');
let t = bu.toString('hex');

console.log(t);
var sixteen = '01ef';
var ten = parseInt(sixteen, 16);
//使用字符串转换为整数的方法实现进制转换
//console.log(ten);


function isNull(id) {
    return (data == "" || data == undefined || data == null) ? "暂无" : data;
}
var Arr = [{ "distance": 492, "distance16": "01ec", "tagip": "192.168.100.54", "id": "7c", "flag": "ac" }, { "distance": 354, "distance16": "0162", "tagip": "192.168.100.53", "id": "7c", "flag": "ac" }, { "distance": 573, "distance16": "023d", "tagip": "192.168.100.52", "id": "7c", "flag": "ac" }, { "distance": 427, "distance16": "01ab", "tagip": "192.168.100.51", "id": "7c", "flag": "ac" }, { "distance": 427, "distance16": "01ab", "tagip": "192.168.100.51", "id": "7c", "flag": "ac" }, { "distance": 427, "distance16": "01ab", "tagip": "192.168.100.51", "id": "7c", "flag": "ac" }];
// let peon = person.reduce((cur,next) => {
//     obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
//     return cur;
// },[])
var data1 = [{ "distance": 533, "distance16": "0215", "tagip": "192.168.100.54", "id": "7c", "flag": "2c" }, { "distance": 348, "distance16": "015c", "tagip": "192.168.100.53", "id": "7c", "flag": "2c" }, { "distance": 429, "distance16": "01ad", "tagip": "192.168.100.51", "id": "7c", "flag": "2c" }, { "distance": 575, "distance16": "023f", "tagip": "192.168.100.52", "id": "7c", "flag": "2c" }];
var res = [{ "distance": 533, "distance16": "0215", "tagip": "192.168.100.54", "id": "7c", "flag": "2c" }, { "distance": 348, "distance16": "015c", "tagip": "192.168.100.53", "id": "7c", "flag": "2c" }, { "distance": 429, "distance16": "01ad", "tagip": "192.168.100.51", "id": "7c", "flag": "2c" }, { "distance": 575, "distance16": "023f", "tagip": "192.168.100.52", "id": "7c", "flag": "2c" }];

if (data1 !== res) {
    //console.log('data不等于res');
}
var hash = {};
Arrr = Arr.reduce(function(arr, current) {
        hash[current.tagip] ? '' : hash[current.tagip] = true && arr.push(current);
        return arr
    }, [])
    //console.log(Arrr);
    // console.log(Arr);
var dataar = {
    distance: 12,
    distance16: 3, //距离
    tagip: 14, //ip地址
    id: 12, //标签id
    flag: 1 //此次信息的标志位
};
var xarry = {
    distance: '',
    distance16: '', //距离
    tagip: '', //ip地址
    id: '', //标签id
    flag: '' //此次信息的标志位
};
xarry.distance = dataar.distance;
xarry.distance16 = dataar.distance16;
xarry.tagip = dataar.tagip;
xarry.id = dataar.id;
xarry.flag = dataar.flag;
var bianliang = dataar;
// dataar.distance = 12321313;
const glob = require('glob');
var result = null;
console.time('glob')
glob(__dirname + '/**/*', function(err, res) {
    result = res;
    console.log('got result');
})
console.timeEnd('glob')
console.log(3 + 3);
try {
    interview(function(res) {
        console.log('smile');
    })
} catch (e) {
    console.log('cry', e)
}

function interview(callback) {
    setTimeout(() => {
        if (Math.random() < 0.1) {
            callback('success');
        } else {
            callback(new Error('fail'));
        }
    }, 500)
}