var x = 10,
  y = 20,
  z = 30
function fn(x, y) {
  console.log(x, y, z);
  var x = 100;
  y = 200;
  z = 300;
  console.log(x, y, z);
}
fn(x, y, z);
console.log(x, y, z);
