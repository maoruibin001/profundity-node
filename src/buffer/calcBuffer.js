/**
 * Created by lenovo on 2017/6/24.
 */
var buffer = new Buffer(100);


buffer[200] = 200;
console.log(buffer[200]); //undefined


buffer[99] = 233;
console.log(buffer[99]); //233


buffer[1] = -1;
console.log(buffer[1]); //-1 + 256 = 255


buffer[3] = 300;
console.log(buffer[3]);//300 - 256 = 44



buffer[3] = 3.44;
console.log(buffer[3]);//3


buffer[4] = -3.44;
console.log(buffer[4]);//-3 + 256 = 253;

console.log(buffer[4] > buffer[3]) //true