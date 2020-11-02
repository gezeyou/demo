//目前已解决深拷贝问题，可直接发送至客户端09/10
const udp = require('./udp');
//用于深拷贝的插件
var _ = require('lodash');
var result;
var xarry = '';
var dataArray = '';
var data1 = '';
var id = '';
var tagid = 2615; //标签id
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
const speed = 10;
const locQuantity = 2;
var data = [];
var zhuloc = '192.168.100.51';
// const fun = (xarry) => {
//     console.log('接到的数据', xarry);
// };
var dataflag = '';
var id = '';
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
    console.log(xarry);
    //标签为111时推送,目前暂时为时间戳的方案，packnumber暂时不推入

    // /console.log(xarry);
    if (xarry.id == tagid) {
        if (dataflag.length !== null) {
            if (xarry.flag !== dataflag) {
                dataflag = xarry.flag;
                id = xarry.id;
                if (data.length >= locQuantity) {
                    // console.log('大于3');
                    // console.log(data);
                    compute();
                    data = [];

                }
                data = [];
            }
            data.push(xarry);

        } else {
            dataflag = xarry.flag;
            id = xarry.id;
            data = [];
            data.push(xarry);
        }
    }

    // if (id.length !== null) {
    //     //不为空后，就是依次的推入数据
    //     //计算当前的id和flag是不是不一样
    //     if (xarry.id == id) {
    //         data.push(xarry);
    //         console.log(data);
    //     } else {
    //         //当前的id发生改变后，
    //         //检验当前的data数组是否符合条件大于3并发送
    //         if (data.length >= 3) {
    //             //发送并清空
    //             //send();
    //             //sendMessage(data);
    //             data = [];
    //         } else { //发送完成后进行标志位和标签id的重置
    //             //试用复位函数
    //             //reset();
    //             dataflag = xarry.flag;
    //             id = xarry.id;
    //             data = [];
    //             data.push(xarry);
    //         }

    //     }

    // } else {
    //     //试用复位函数
    //     //reset();
    //     dataflag = xarry.flag;
    //     id = xarry.id;
    //     data.push(xarry);
    // }


    //进行排序
    // if (data.length == 4) {
    //     data.sort(compare("tagip"));
    //     data1 = data;
    //     data = [];
    // } else { //完成了逢AAA首位就清空数组，非首位就推入数组
    //     //希望xarry内是带有基站id的，这样子就可以做排序
    //     if (xarry.flag == zhuloc) {
    //         data = [];
    //         data.push(xarry);
    //     } else {
    //         data.push(xarry);
    //     }
    // }


    // if (xarry.tagid == '11111111') {
    //     dataArray111.locationlist.push(location);
    //     if (dataArray111.locationlist.length > 200) {
    //         dataArray111.locationlist.splice(0, 100);
    //         console.log('减掉了');
    //     }
    // } else if (xarry.tagid == '22222222') { //标签为222时推送
    //     dataArray222.locationlist.push(location);
    //     if (dataArray222.locationlist.length > 200) {
    //         dataArray222.locationlist.splice(0, 100);
    //         console.log('减掉了');
    //     }
    // } else { //标签为333时推送
    //     dataArray666.locationlist.push(location);
    //     if (dataArray666.locationlist.length > 200) {
    //         dataArray666.locationlist.splice(0, 100);
    //         console.log('减掉了');
    //     }
    // }

    // compute();
});
const getData = (ws) => {
    //Arrr.length > 1限制单个标签
    if (dataArray !== Arrr && Arrr.length >= locQuantity) {
        dataArray = Arrr;
        //首先遍历数组，数组内是否有存在这个数
        //存在就更新相关的元素
        //不存在就推送

        ws.send(JSON.stringify(dataArray));
    }

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