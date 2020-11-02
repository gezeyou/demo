// Load Chance
var Chance = require('chance');
const speed = 200;
// Instantiate Chance so it can be used
var chance = new Chance();
var is = 4;
let newArr = []; //创建一个新数组

const cch = function(callback) {
    const cj = setInterval(function() { ins(callback); }, speed);
    setTimeout(() => {
        clearInterval(cj);
    }, speed * 20);
}



function ins(callback) {
    if (is == 4) {
        randomArr();
    } else {
        const bkkk = chance.floating({ min: 0, max: 10, fixed: 4 });
        const bianliang = { TagID: newArr[is], Distance: bkkk * 100 };

        is++;
        callback(bianliang);

    }


}
module.exports = cch;


function randomArr() {
    let locationArray = ['A', 'B', 'C', 'D'];
    newArr = [];
    for (let i = 0; i < 4; i++) {
        let temp = Math.floor(Math.random() * locationArray.length); //取随机下标
        newArr.push(locationArray[temp]); //添加到新数组
        locationArray.splice(temp, 1) //删除当前的数组元素,避免重复
    }

    is = 0;
}



const data = '[PDOA>>Station ID:00000006,TagID:66666666,Angle:113.0,Distance:379.6,packnumber:150]';