var x = 0;
const udp = function(callback) {
    setInterval(dsa(callback), 1000);

}

function dsa(callback) {
    x++;
    callback(x);
}
module.exports = udp;