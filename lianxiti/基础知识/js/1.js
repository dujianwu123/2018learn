var a = 12;
var b = a;
b = 13;
console.log(a);

var obj1 = {
    n: 100
};
var obj2 = obj1;
obj2['n'] = 200;
console.log(obj1.n);


try {
    var obj3 = {
        n: 10,
        m: obj.n * 10
    };
    console.log(obj3.m); //obj is not definedat 1.js:16
} catch (error) {
    console.log(error);

}


var arr1 = [3, 4];
var arr2 = arr1;
arr2[0] = 1;
arr2 = [4, 5];
arr2[1] = 2;
arr1[1] = 0;

console.log(arr1, arr2);

// BAT面试题
var num = parseInt('width:35.5px');
if (num == 35.5) {
    alert(0);
} else if (num == 35) {
    alert(1);
} else if (num == NaN) {
    alert(2);
} else if (typeof num == 'number') {
    alert(3);
} else {
    alert(4);
}
//'3'


console.log(Number(''));
console.log(Number(' '));
console.log(Number('\n'));
console.log(Number('\t'));
//都是0


var a = 10;
if (a > 10){
    alert('A');
} else if (a - 10 + ''){
    alert('B');
} else {
    alert('C');
}

//'B'
if(1===3){


}









