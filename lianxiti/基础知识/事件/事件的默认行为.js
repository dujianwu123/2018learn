let oTxt = document.getElementsByTagName('input');
oTxt[0].onkeydown = function(ev){
  ev = ev || window.event;
  let value= this.value.trim();
  let len = value.length;
  if(len===6){
    this.value=value.substr(0,6);
    let code = ev.which || ev.keyCode;
    if(!/^(46|8|37|38|39|40)$/.test(code)){
      ev.preventDefault ? ev.preventDefault():ev.returnValue = false;
    }
  }
}