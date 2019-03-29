//英文字母汉字组成的字符串，用正则给英文单词前后加空格


var reg=/djw(\d+)/g;
        var str='djw888djw666djw555';
        //用exec执行3次，每一次不仅仅把大正则匹配的获取到，而且还可以获取第一个分组匹配的内容
        console.log(reg.exec(str));
        console.log(reg.exec(str));
        console.log(reg.exec(str));
        console.log(reg.exec(str));
