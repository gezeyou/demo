//目前已解决深拷贝问题，可直接发送至客户端09/10
const udp = require('./udp');
//用于深拷贝的插件
var _ = require('lodash');
var result;
var xarry = '';
var dataArray = '';
var data1 = '';
var id = '';
var tagid = 3195; //标签id
var dataArray111 = {
    id: '11111111',
    locationlist: [],
    history: { x: '', y: '' },
    xlist: '',
    ylist: '',
    packnumber: ''
};
var dataArray222 = {
    id: '22222222',
    locationlist: [],
    history: { x: '', y: '' },
    xlist: '',
    ylist: '',
    packnumber: ''
};
var dataArray666 = {
    id: '33333333',
    locationlist: [],
    history: { x: '', y: '' },
    xlist: '',
    ylist: '',
    packnumber: ''
};
var a = {
    locheight: 3.14,
    tagheight: 1.14
};
var Arrr = '';
//坐标原点
// var X = 276.99; //3.7/11*822
// var Y = 290; //2.9/6*600
// var gridnum = 74.73;
//发送间隔
const speed = 100;
const evallength = 10;
const locQuantity = 2;
const index = 0;
var data = {};
var zhuloc = '192.168.100.51';
// const fun = (xarry) => {
//     console.log('接到的数据', xarry);
// };
var dataflag = '';
// var id = '';
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
udp((res) => {

    xarry = _.cloneDeep(res);
    //目前暂时为时间戳做辨别
    xarry['time'] = new Date();


    // /console.log(xarry);
    // if (xarry.id == tagid) {

    let id = _.cloneDeep(xarry.id);
    let idflag = _.cloneDeep(xarry.flag);
    if (data.hasOwnProperty(id)) {
        //删除start
        if (data[id].distancelist[index].length > evallength) {
            data[id].distancelist[index].splice(0, evallength / 2)
        }
        if (data[id].distancelist.length > evallength) {
            data[id].distancelist.splice(0, evallength / 2)
        }
        //删除end
        //进行判断
        //目前先针对单个标签的flag判断，id的情况到时候外嵌就行了
        if (data[id].flag == xarry.flag) {
            let listlength = data[id].distancelist.length - 1;
            data[id].distancelist[listlength].push(xarry);
            return
        }
        data[id].distancelist.push([xarry]);
        data[id].flag = idflag
        return
    }
    data[id] = {
        id: id,
        distancelist: [
            [xarry]
        ],
        flag: xarry.flag
    }

    //先判断是否存在这个id值
    // if (data.hasOwnProperty(id)) {
    //     //删除start
    //     if (data[id].distancelist[index].length > evallength) {
    //         data[id].distancelist[index].splice(0, evallength / 2)
    //     }
    //     //删除end
    //     //进行判断
    //     //目前先针对单个标签的flag判断，id的情况到时候外嵌就行了
    //     if (data[id].flag == xarry.flag) {
    //         let listlength = data[id].distancelist.length - 1;
    //         data[id].distancelist[listlength].push(xarry);

    //     } else {
    //         data[id].distancelist.push([xarry]);
    //         data[id].flag = idflag
    //     }

    // } else {
    //     data[id] = {
    //         id: id,
    //         distancelist: [
    //             [xarry]
    //         ],
    //         flag: xarry.flag
    //     }
    //     return
    // }
    // console.log(data);
    // if (dataflag.length !== null) {
    //     if (xarry.flag !== dataflag) {
    //         dataflag = xarry.flag;
    //         id = xarry.id;
    //         if (data.length >= locQuantity) {
    //             // console.log('大于3');
    //             // console.log(data);
    //             compute();
    //             data = [];

    //         }
    //         data = [];
    //     }
    //     data.push(xarry);

    // } else {
    //     dataflag = xarry.flag;
    //     id = xarry.id;
    //     data = [];
    //     data.push(xarry);
    // }
    // }


});
const getData = (ws) => {
    //Arrr.length > 1限制单个标签
    // if (dataArray !== Arrr && Arrr.length >= locQuantity) {
    //     dataArray = Arrr;
    //首先遍历数组，数组内是否有存在这个数
    //存在就更新相关的元素
    //不存在就推送
    console.log(data);
    ws.send(JSON.stringify(data));
    //}

    setTimeout(() => {
        getData(ws);
    }, speed);
}

function compute() {
    //检验当前数组每个元素是否唯一并且ctn号一致
    var hash = {};
    Arrr = data.reduce(function(arr, current) {
            hash[current.tagip] ? '' : hash[current.tagip] = true && arr.push(current);
            return arr
        }, [])
        //发送
    data = [];
}

// app.listen(3002, () => {
//     console.log('3002端口启动成功');
// });


function reset() {
    dataflag = xarry.flag;
    id = xarry.id;
    data.push(xarry);
}

function unique(data) {
    const res = new Map();
    return data.filter((a) => !res.has(a.flag) && res.set(a.flag, 1))
}

function compute111(element) {
    let arry = element.locationlist;
    // let brry = new Array();
    if (arry.length > filtercoefficient) {
        let brry = arry.slice(-filtercoefficient);
        //筛选记录下坐标的数组
        brry.sort(compare("tangle"));
        let axxxx = brry.slice(1, arry.length - 1);
        for (let is = axxxx.length - 1; is >= 0; is--) {
            let ss = axxxx[is].distance;
            s += parseFloat(ss);
        }
        distance = s / axxxx.length;
        distance = distance.toFixed(4);
        distance = parseFloat(distance);
        s = 0;
        for (let is = axxxx.length - 1; is >= 0; is--) {
            let ss = axxxx[is].tangle;
            w += parseFloat(ss);
        }
        tangle = w / axxxx.length;
        tangle = tangle.toFixed(4);
        w = 0;
        distance = distance / 100 - 0.2;
        tangle = parseFloat(tangle);
        tangle = tangle + offsetAngle;
        locheight = a.locheight;
        tagheight = a.tagheight;
        const abw = locheight - tagheight;
        let distancepingfang = Math.pow(distance, 2);
        let loctagheight = Math.pow(abw, 2);
        let zhongjian = distancepingfang - loctagheight;
        let infactDistance = Math.sqrt(zhongjian);
        let xInfactDistance = '';
        let yInfactDistance = '';
        //xy都是按照四个象限的坐标系来算出，在后面才会算出在画布上的具体坐标
        if (tangle > 360) {
            k = 1;
        }
        if (tangle > k * 360 && tangle <= k * 360 + 90) {
            //坐标在第一象限的时候
            xInfactDistance = infactDistance * Math.sin(tangle * Math.PI / 180);

            yInfactDistance = infactDistance * Math.cos(tangle * Math.PI / 180);
        } else if (tangle > k * 360 + 90 && tangle <= k * 360 + 180) {
            tangle = k * 360 + 180 - tangle;
            xInfactDistance = infactDistance * Math.sin(tangle * Math.PI / 180);
            //y坐标需要取反
            yInfactDistance = -infactDistance * Math.cos(tangle * Math.PI / 180);
        } else if (tangle > k * 360 + 180 && tangle <= k * 360 + 270) {
            tangle = k * 360 + 270 - tangle;
            yInfactDistance = -infactDistance * Math.sin(tangle * Math.PI / 180);
            //此处X应取反
            xInfactDistance = -infactDistance * Math.cos(tangle * Math.PI / 180);

        } else {
            tangle = k * 360 + 360 - tangle;
            //此处X应取反
            xInfactDistance = -infactDistance * Math.sin(tangle * Math.PI / 180);
            //此处y取反
            yInfactDistance = infactDistance * Math.cos(tangle * Math.PI / 180);
        }
        element.xlist = xInfactDistance;
        element.ylist = yInfactDistance;
    }
}

//计算距离和角度的平均值
var s = 0;
var w = 0;


//排序函数
function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}