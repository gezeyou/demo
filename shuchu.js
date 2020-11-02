var name = 1;
var funA = function(){
   return `我是${name}`
}
module.exports = {
  name:name,  // 至于前面的变量名可以任意,但是在另外一模块中引入时要与该变量名保持一致,否则就会报错，也可以只写一个name
  funA:funA  // 也可以只写一个funA
}