let fs = require('fs');
const { createInflate } = require('zlib');
const fileName = ['./12.txt', './56.txt'];
let xarry = {
    x: 1,
    y: 2
};
const str = JSON.stringify(xarry);
//deleteTxt();
//createFile();
const msg = 'ABXMgBEAAABEAQAADH/VB6AATJIBAxZnKg==';
let base = msg.toString();
let buff = Buffer.from(base, 'base64');
console.log(buff);

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