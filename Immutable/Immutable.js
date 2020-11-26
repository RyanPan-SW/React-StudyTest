// Immutable
let immutable = require("immutable");
// Map
let obj1 = immutable.Map({ name: "zhangsan", age: 10 });
let obj2 = obj1.set("name", "lisi");
let obj3 = obj2.update("age", (x) => x + 12);
let obj4 = obj3.merge({ name: "beijing", sex: '0' });
console.log(obj2.get('name'));

// let obj5 = 