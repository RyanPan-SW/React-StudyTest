// Immutable
let immutable = require("immutable");


// Map
let obj1 = immutable.Map({ name: "zhangsan", age: 10 });
let obj2 = obj1.set("name", "lisi");
let obj3 = obj2.update("age", (x) => x + 12);
let obj4 = obj3.merge({ name: "beijing", sex: "0" });

// console.log(obj2.get("name"));

let obj5 = immutable.fromJS({
  user: { name: "zhufeng", age: 9 },
  key: "value",
});
let obj6 = obj5.setIn(["user", "name"], "zhangsan");
let obj7 = obj6.updateIn(["user", "age"], (x) => x + 11);
let obj8 = obj7.mergeIn(["user"], { home: "xxxx" });

// console.log(obj8.toJS());
let map1 = immutable.Map({ name: "zhangsan" });
let map2 = immutable.Map({ name: "zhangsan" });
console.log(map1 === map2);                 // false
console.log(Object.is(map1, map2));         // false
console.log(immutable.is(map1, map2));      // true







// list