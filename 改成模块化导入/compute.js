var _ = require('lodash');
const evallength = 10;
const locQuantity = 2;
const index = 0;
module.exports = function(xarry) {
    var res = '';
    res = _.cloneDeep(xarry);
    //目前暂时为时间戳做辨别
    res['time'] = new Date();
    //console.log(global.data);
    // if (xarry.id == tagid) {
    const data = global.data;
    const id = _.cloneDeep(res.id);
    const idflag = _.cloneDeep(res.flag);

    if (data.hasOwnProperty(id)) {

        //删除start
        if (data[id].distancelist[index].length > evallength) {
            data[id].distancelist[index].splice(0, evallength / 2)
        }
        if (data[id].distancelist.length > evallength) {
            data[id].distancelist.splice(0, evallength / 2)
        }
        const listlength = data[id].distancelist.length - 1;
        //删除end
        //进行判断
        //目前先针对单个标签的flag判断，id的情况到时候外嵌就行了
        //获取当前准确的索引号
        if (data[id].flag == res.flag && data[id].distancelist[listlength].length > 0 && data[id].distancelist[listlength].length < 5) {
            data[id].distancelist[listlength].push(res);
            return
        }
        data[id].distancelist.push([res]);
        data[id].flag = idflag
        return
    }
    data[id] = {
            id: id,
            distancelist: [
                [res]
            ],
            flag: idflag
        }
        // console.log(data);
}