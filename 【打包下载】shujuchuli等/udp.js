const udp = function(callback) {
        var UDPPORT = 4003;
        let xarry = {
            distance: '',
            distance16: '', //距离
            tagip: '', //ip地址
            id: '', //标签id
            flag: '' //此次信息的标志位
        };
        const dgram = require('dgram');
        let serverudp = dgram.createSocket('udp4');
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
            let ididflag = /0a37/;
            ididflag = ididflag.test(cent);
            //console.log(cent);

            if (centflag && ididflag) {
                let str = cent.match(/07a0(\S*)/)[1];
                const strforst = cent.match(/(\S*)07a0/)[1];
                const idflag = strforst.substring(strforst.length - 6, strforst.length);
                let id = idflag.substring(0, 4);
                const idten = parseInt(id, 16);
                const flag = idflag.substring(4, 6);
                str = str.substring(0, 4);
                //console.log('substring' + str);
                const result = parseInt(str, 16);
                //console.log(result);
                const distance16 = str;
                xarry.distance16 = distance16;
                xarry.distance = result;
                xarry.tagip = rinfo.address;
                xarry.id = idten;
                xarry.flag = flag;
                console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
                callback(xarry);
                //console.log(xarry);
            }

        });

    }
    //UDP服务器部分end

module.exports = udp;