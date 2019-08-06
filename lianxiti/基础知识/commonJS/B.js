let A = require('./A.js');
function avg (...arg) {
  let total = A.sum(...arg);
  return total/arg.length;
}
module.exports = {
  avg
}