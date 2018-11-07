function fn(b) {
  console.log(b);
  function b() {
    console.log(b);
  }
  b();
}
fn(1);