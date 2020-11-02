module.exports = function(msg, rinfo, xarry) {
    //判断包是不是心跳包
    //判断包的长度来判定是否是半包
    //判断包是否存在关键字
    let base = msg.toString();
    let buff = Buffer.from(base, 'base64');
    let cent = buff.toString('hex');
    xarry.buffer = cent;
    return xarry;
}