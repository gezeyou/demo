var _ = require('lodash');
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
var dataid = '';
var attitude = '';
var ipkey = '';
module.exports = function(xarry) {
        //检测global.data里是否存在该数
        dataid = _.cloneDeep(xarry.id);
        locaddress = _.cloneDeep(xarry.ipAddress);
        attitude = _.cloneDeep(xarry.attitude)
        if (!global.data.hasOwnProperty(dataid)) {
            //先遍历创建id下的二级菜单locip
            //然后创建各个ip的normal，duanbao，zhanbao
            let data = {}
            Object.keys(ip).forEach(key => {
                    data[key] = {
                        normal: 0,
                        duanbao: 0,
                        zhanbao: 0
                    }
                })
                //命名id
            global.data[dataid] = _.cloneDeep(data);
        }
        //计数
        computed()
    }
    //对应加加加的函数
function computed() {
    Object.keys(ip).forEach(key => {
        if (ip[key] === locaddress) {
            ipkey = key
        }

    })
    if (ipkey.length > 0) {
        global.data[dataid][ipkey][attitude]++
    }

    // if (attitude === 'normal') {
    //     global.data[dataid.id].normal++
    // }
    // if (attitude === 'duanbao') {
    //     global.data[dataid.id].duanbao++
    // }
    // if (attitude === 'zhanbao') {
    //     global.data[dataid.id].zhanbao++
    // }
}