// 数组扁平化

/**
 * es6提供的方法flat(depth)
 * depth: 代表展开的深度，默认值为 1； 值为 Infinity ，无需知道数组的维度，直接将目标数组变成1维数组
 */
let arr1 = [1, 2, ["a", "b", ["中", "文", [1, 2, 3, [11, 21, 31]]]], 3];
let arr2 = [
  { a: "a", b: "b", c: 3, d: 123 },
  { a: "a", b: "b", c: 3 },
  [
    { a: "a", b: "b", c: 3 },
    { a: "a", b: "b", c: 3 },
    [
      { a: "a", b: "b", c: 3 },
      { a: "a", b: "b", c: 3 },
      [
        { a: "a", b: "b", c: 3 },
        { a: "a", b: "b", c: 3 },
        { a: "a", b: "b", c: 3 },
        [
          { a: "a", b: "b", c: 3 },
          { a: "a", b: "b", c: 3 },
          { a: "a", b: "b", c: 3 },
        ],
      ],
    ],
  ],
  { a: "a", b: "b", c: 3 },
];
// console.log(arr1.flat(Infinity));
// console.log(arr2.flat(Infinity));

/**
 * for 循环方法
 * 换成forEach也是同样的效果
 * concat() 用于链接两个或多个字符串
 */

function flatten(arr) {
  if (!Array.isArray(arr)) throw Error("params is not Array");
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      newArray = newArray.concat(flatten(item));
    } else {
      newArray.push(item);
    }
  }
  // arr.forEach(item => {
  //   if (Array.isArray(item)) {
  //     newArray = newArray.concat(flatten(item));
  //   } else {
  //     newArray.push(item);
  //   }
  //   return null;
  // });
  return newArray;
}

// console.log(flatten(arr2));

function flattenWhile(arr) {
  if (!Array.isArray(arr)) throw Error("参数必须是一个数组");

  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  console.log(arr);
  return arr;
}
// console.log(flattenWhile(arr1));

/**
 * reduce方法
 * reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
 * reduce() 可以作为一个高阶函数，用于函数的 compose。
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * 参考： https://www.runoob.com/jsref/jsref-reduce.html
 */
function flattenReduce(arr) {
  if (!Array.isArray(arr)) throw Error("参数必须是一个数组");
  return arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flattenReduce(next) : next);
  }, []);
}
// console.log("flatten", flattenReduce(arr2));

// 如果数组的每一项全为数字，甚至可以直接使用下面方法
// console.log(arr1.toString().split(','));