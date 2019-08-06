function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  let t = new obj.constructor();
  hash.set(obj, t)
  for (let key in obj) {
    if (obj[key] && typeof obj === 'object') {
      t[key] = deepClone(obj[key], hash)
    } else {
      t[key] = obj[key];
    }
  }
  return t;
}
let obj = [1, { b: 2 }];
let obj2 = deepClone(obj);
obj[1].b = 3;
console.log(obj, obj2);