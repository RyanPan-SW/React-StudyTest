/* eslint-disable no-unused-vars */
const array1 = [31, 2, 1, 22, 34, 13, 13, 62, 534, 67, 544, 533, 44, 24, 232, 12, 3, 43, 56, 45, 1, 1, 4, 5];
const array = (max = 800) => {
  let arr = [];
  while (arr.length <= max) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
};
const data = array();

// console.time()
// console.log(data.sort((a, b) => { return a-b }));
// console.timeEnd()

/**
 * 基础思路: 方案一
 * 快速排序
 */

function quickSort(array) {
  if (array.length <= 1) return array;
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  array.forEach(item => {
    item < pivot ? left.push(item) : right.push(item);
  });
  return quickSort(left).concat([pivot], quickSort(right));
}

// console.time();
// console.log("quickSort", quickSort(data));
// console.timeEnd();

/**
 * 优化方案：方案二
 * 1. 取无序数组的最后一位作为基数
 * 2. 将所有比基数小的放在左边
 *    将所有比基数大的放在右边
 *    如果没有比基数大的，就将自己赋值给自己
 * 3. 将左右两边的数据重复上面的操作
 * 缺点：
 * 这种快排欠缺 2 个考虑：
 * 1. 有序数组的情况。如果当前数组已经有序了，那就不需要进一步递归了。
 * 2. 大量重复数据的情况。如果当前数组重复数据较多，那么比较难保证递归两遍的数组平衡。
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
        i++;
      }
      arr[j] = arr[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）

      while (j > i && arr[j] >= baseVal) {
        //找到一个比基准值小的数交换
        j--;
      }
      arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
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
// console.log("quickSort2", quickSort2(data));
// console.timeEnd();

/**
 * 方案三： 三路快排
 * 三路快速排序是快速排序的的一个优化版本，将数组分成三段，即小于基准元素、等于基准元素和大于基准元素，
 * 这样可以比较高效的处理数组中存在相同元素的情况，其它特征与快速排序基本相同。
 */
const quickSort3 = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let leftPos = left - 1;

    let middlePos = 0;

    const compareValue = arr[right];

    for (let i = left; i <= right; i++) {
      if (arr[i] <= compareValue) {
        leftPos++;
        [arr[i], arr[leftPos]] = [arr[leftPos], arr[i]];
        if (arr[i] === compareValue) {
          middlePos++;
        }
      }
    }

    quickSort3(arr, 0, leftPos - 1);
    quickSort3(arr, leftPos + middlePos, right);
  }

  return arr;
};

// console.time();
// console.log("quickSort3", quickSort3(data));
// console.timeEnd();

// 后记：在测试中 quickSrot、quickSort2计算时间上面相比较，数量非常大的情况下 quickSort 的时间近乎相当于 quickSort2 的时间的两倍
