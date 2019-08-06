function sum (...arg) {
  return arg.reduce((prev, next) => {
    return prev + next;
  })
}

// console.log(sum(1,2,3,4,5,10));
module.exports = {
  sum
}