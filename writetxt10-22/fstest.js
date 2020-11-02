let fs = require('fs');
const { createInflate } = require('zlib');
const fileName = ['./12.txt', './56.txt'];
var _ = require('lodash');
let xarry = {
    x: 1,
    y: 2
};
const str = JSON.stringify(xarry);
//deleteTxt();
//createFile();
const zhanbao = 'ABXMgBEAAABEAQAADHmjB6AAeYoBAxZUGw==ABDMAREAAABEwwEAAwAAAAAAxv0=';
const duanbao = 'ABDMAREAAABEwwEAAwAAAAAAxv0=';
const boost = 'ABDMAREAAABEFgEAAwAAAAAAAqQ=';
const msg = 'ABXMgBEAAABEAQAADH/VB6AATJIBAxZnKg==';
var xa = {
    buff: ''
}
var ip = {
    locip1: "192.168.100.47",
    locip2: "192.168.100.51",
    locip3: "192.168.100.60",
    locip4: "192.168.100.65",
    locip5: "192.168.100.68",
    locip6: "192.168.100.69",
    locip7: "192.168.100.70",
    locipziji: "192.168.100.195"
}
global.data = {};
var data = {}
Object.keys(ip).forEach(key => {
        data[key] = {
            normal: 0,
            duanbao: 0,
            zhanbao: 0
        }
    })
    //console.log(data);
var dataArray = {};
const idid = 8756;
const ipid = 'locip3'
global.data[idid] = _.cloneDeep(data)
console.log(global.data[idid][ipid]);
Object.keys(dataArray).forEach(key => {
        //console.log(key)

    })
    //console.log(dataArray[idid].);
let base = msg.toString('utf8');

let buff = Buffer.from(msg, 'base64');

let cent = Buffer.from(buff, 'ascii');

let cenflag = /07a0/;
const zhanstr = zhanbao.toString();
const zhanindex = zhanbao.indexOf('==')
const asc = msg.charCodeAt(msg.length - 1).toString(16);
const zuihou = zhanbao.slice(zhanindex + 3, zhanbao.length);
const shouwei = zhanbao.slice(1, 5);
const msgflag = zhanbao.indexOf(shouwei);
var hex = '';
var h = '';
//OnConvert();

function OnConvert() {
    const len = msg.length;
    console.log(hex.length);
    if (len == 0) return;
    for (i = 0; i < len; i++) {
        let a = msg.charCodeAt(i);
        h = a.toString(16);
        if (h.length == 1) h = '0' + h;
        hex += h;
    }

}

function OnSelect() {
    document.calcform.hex.select();
}





if (!cenflag.test(cent)) {
    console.log(1)
}

function createFile() {
    return new Promise((resolve, reject) => {
        fileName.forEach((element) => {
            fs.writeFile(element, str + '\n', { 'flag': 'a' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(console.log(element + '写入完成'))
            })
        })
    })
}

function deleteTxt() {
    return new Promise((resolve, reject) => {
        fileName.forEach((element) => {
            fs.unlink(element, function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                resolve(console.log('删除文件' + element + '成功'));
            })
        })

    })
}