// function _new () {
//   let target = {};
//   let [constructor, ...arg] = [...arguments];
//   target.__proto__ = constructor.prototype;
//   let result = constructor.apply(target, arg);
//   if (result && (typeof result === 'object' || typeof result === 'function')) {
//     return result;
//   }
//   return target;
// }

// function _new () {
//   let target = {};
//   let [constructor, ...arg] = [...arguments];
//   target.__proto__ = constructor.prototype;
//   let result = constructor.apply(target,arg);
//   if (result && (typeof result === 'object' || typeof result === 'function')) {
//     return result;
//   }
//   return target
// }

// function _new () {
//   let target = {};
//   let [constructor, ...arg] = [...arguments];
//   target.__proto__ = constructor.prototype;
//   let result = constructor.apply(target,arg);
//   if (result && (typeof result === 'object' || typeof result === 'function')) {
//     return result;
//   }
//   return target;
// }
// function _new () {
//   let target = {};
//   let [constructor, ...arg] = [...arguments];
//   target.__proto__ = constructor.prototype;
//   let result = constructor.apply(target, arg);
//   if (result && (typeof resule === 'object' || typeof result === 'function')) {
//     return result;
//   }
//   return target;

// }

function _new() {
  let target = {};
  let [constructor, ...arg] = [...arguments];
  target.__proto__ = constructor.prototype;
  let result = constructor.apply(target, arg);
  if (result && (typeof resule === 'object' || typeof result === 'function')) {
    return result;
  }
  return target
}

