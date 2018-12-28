const NUM = 45;
interface Cat {
  name: String,
  sex: String
}
function touchCat (cat: Cat){
  console.log('miao~',cat.name);
  
}
touchCat({
  name: 'Tom',
  sex: 'male'
})