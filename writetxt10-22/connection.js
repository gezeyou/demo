module.exports = function(buff, foot, rinfo, xarry) {
    //判断包是不是心跳包
    //判断包的长度来判定是否是半包
    //判断包是否存在关键字
    if (foot.length > 0) {
        //console.log('foot');
        //console.log(foot.length);
        let basefoot = foot.toString();
        let bufferfoot = Buffer.from(basefoot, 'base64');
        let centfoot = bufferfoot.toString('hex');
        xarry.bufferfoot = centfoot;
    }
    let base = buff.toString();
    let buffer = Buffer.from(base, 'base64');
    let cent = buffer.toString('hex');
    xarry.buffer = cent;
    xarry.ipAddress = rinfo.address;
    //xarry做记录，id跟基站
    let cenflag = /07a0/;
    let centflag = cenflag.test(cent);
    let ididflag = /0c7b/;
    ididflag = ididflag.test(cent);
    if (centflag) {
        const strforst = cent.match(/(\S*)07a0/)[1];
        const idflag = strforst.substring(strforst.length - 6, strforst.length);
        let id = idflag.substring(0, 4);
        const idten = parseInt(id, 16);
        xarry.id = idten;
        console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    }
    return xarry;
}