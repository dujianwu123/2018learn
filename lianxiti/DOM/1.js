
let oOuter = document.getElementById('outer')
let oInner = document.getElementById('inner')
let oCenter = document.getElementById('center')

console.log(oOuter.clientWidth)

/*
 * @Author: DuJianWu 
 * @Date: 2018-11-09 16:40:34 
 * @Last Modified by: DuJianWu
 * @Last Modified time: 2018-11-09 16:53:24
 * 获取元素样式
 */
function getCss (obj,attr){
    if('getComputedStyle' in window){
        let val = window.getComputedStyle(obj,null)[attr]
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i
        reg.test(val) ? val = parseFloat(val) : null
        return  val
    }
    throw new SyntaxError('浏览器版本过低，请升级浏览器！')
}

console.log(getCss(oOuter,'width'),getCss(oOuter,'border'))