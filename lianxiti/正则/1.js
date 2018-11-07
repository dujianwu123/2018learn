let ss = new RegExp(/\d/)
let str= 'asdAsdhj****9as89d89asdas'

console.log(ss.test(str))

let reg = /a/
console.log(reg.test(str))

console.log(reg.exec(str))

console.log(str.match(/a/ig))

let str2 = str.replace(/a/ig,function ($0){
    return '*'
})
console.log('111',str2)