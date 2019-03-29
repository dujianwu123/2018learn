Object.prototype.AA = 100;
Object.prototype.BB = 100;
let obj = {name: 'xxx', 1: 1, age: 25, 0: 0};//=>obj.__proto__===Object.prototype
for (let key in obj) {
    console.log(key);
    if (!obj.hasOwnProperty(key)) {
        break;
    }
}