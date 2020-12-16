/* eslint-disable no-unused-vars */
const array1 = [31, 2, 1, 22, 34, 13, 13, 62, 534, 67, 544, 533, 44, 24, 232, 12, 3, 43, 56, 45, 1, 1, 4, 5];
const array = (max = 800) => {
  let arr = [];
  while (arr.length <= max) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
};

/**
 * 方案一
 * 快速排序
 * 这套排序来源阮一峰的方案
 */

function quickSort(array) {
  if (array.length <= 1) return array;
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array.splice(pivotIndex, 1)[0];
  let left = [],
    right = [];
  array.forEach(item => {
    if (item < pivot) {
      left.push(item);
    } else {
      right.push(item);
    }
  });

  return quickSort(left).concat([pivot], quickSort(right));
}

// console.time();
// console.log("quickSort", quickSort(array(15)));
// console.timeEnd();

/**
 * 方案二
 * 1. 取无序数组的最后一位作为基数
 * 2. 将所有比基数小的放在左边
 *    将所有比基数大的放在右边
 *    如果没有比基数大的，就将自己赋值给自己
 * 3. 将左右两边的数据重复上面的操作
 */
const quickSort2 = array => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return; //如果左边的索引大于等于右边的索引说明整理完毕
    let i = left;
    let j = right;
    const baseVal = arr[j]; // 取无序数组最后一个数为基准值
    while (i < j) {
      //把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) {
        //找到一个比基准值大的数交换
        console.log("i", i);
        i++;
      }
      arr[j] = arr[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      console.log("j => i", i, j, arr);

      while (j > i && arr[j] >= baseVal) {
        //找到一个比基准值小的数交换
        console.log("j", j);
        j--;
      }
      arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
      console.log("i => j", i, j, arr);
    }
    arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j - 1); // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right); // 将右边的无序数组重复上面的操作
  };
  // const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
  sort(array);
  return array;
};

// console.time();
// console.log("quickSort2", quickSort2(array(15)));
// console.log("quickSort2", quickSort2([43, 123, 42, 15, 12, 56, 18, 22]));
// console.timeEnd();

// 后记：在测试中 quickSrot、quickSort2计算时间上面相比较，数量非常大的情况下 quickSort 的时间近乎相当于 quickSort2 的时间的两倍
