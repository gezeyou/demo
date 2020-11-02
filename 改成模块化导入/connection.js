module.exports = function(msg, rinfo, xarry) {
    let asd = msg.toString();
    let buff = Buffer.from(asd, 'base64');
    let cent = buff.toString('hex');
    let cenflag = /07a0/;
    let centflag = cenflag.test(cent);
    let ididflag = /0c7b/;
    ididflag = ididflag.test(cent);
    if (centflag) {
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
        xarry.port = rinfo.port;
        xarry.id = idten;
        xarry.flag = flag;
        xarry.time = new Date();
        console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    }
    return xarry;
}