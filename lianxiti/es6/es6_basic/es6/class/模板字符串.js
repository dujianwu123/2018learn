let name = 'djw';
let age = 18;
let desc = "${name} 今年 ${age} 岁了";
function myString(desc){
    return desc.replace(/\$\{([^{]+)\}/g,function(text,key){
        return eval(key);
    });
}

desc = myString(desc);
console.log(desc);


function myDesc(text,...values){
    let result = '';
    for(let i=0;i<values.length;i++){
      result += (text[i]+values[i])
    }
    result += text[text.length-1]

    return result.toUpperCase();
}
let str = myDesc`${name} 今年 ${age} 岁了`

console.log(str);

