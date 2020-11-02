// let B = require('./b')
// console.log(B.avg(12, 23, 34, 45, 56, 67, 78, 89))
var fun1 = require('./a');
var fun2 = require('./b');

function test() {
    console.log("调用了app的test方法");
    fun1.add(1, 2);
    fun2();
}
test();