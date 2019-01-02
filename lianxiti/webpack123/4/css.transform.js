module.exports = function(css){
  console.log(css);
  console.log(window.innerWidth);
  if(window.innerWidth>=780){
    return css.replace('grey','green');
  }else{
    return css;
  }
}