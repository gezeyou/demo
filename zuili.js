var  m =  require("./shuchu.js");
const { times } = require("lodash");
var  name =m.name;
var fun1=function(){
    setInterval(()=>{ name++;
    console.log(name);},4000);
   
}
var fun2=function(){ setInterval(()=>{console.log(times);},2000)
    
}
module.exports = {
    i:name,  // 至于前面的变量名可以任意,但是在另外一模块中引入时要与该变量名保持一致,否则就会报错，也可以只写一个name
    fun1:fun1,
    fun2:fun2  // 也可以只写一个funA
  }