// 使用 chance随机生成数据
const cch = require('./cch');
//存储基站组合的数组
var data = [];
//存储组合的数组，内部有四个基站的数据，且每个数组里的基站都不会重复
var dataArray = [];
cch((res) => {
    //下一步检测先出现基站A，然后计数直到第二个基站A出现
    if (data.length == 4) {
        dataArray.push(data);
        console.log(dataArray.length);
        data = [];
    } else {
        data.push(res);
    }

})