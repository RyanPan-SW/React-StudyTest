/**
 * 防抖函数
 * 功能：所谓防抖，就是指触发事件后，就是把触发非常频繁的事件合并成一次去执行。
 *      即在指定时间内只执行一次回调函数，如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算。
 *      防抖和节流严格算起来应该属于性能优化的知识，但实际上遇到的频率相当高，处理不当或者放任不管就容易引起浏览器卡死。
 * @param {function} fn 防抖函数
 * @param {number} time 防抖间隔(单位：ms)
 * 场景：浏览器滚动，模糊搜索，页面改变等操作频繁，但是代码跟不上操作等场景等。
 * 初级的简单版本
 */

export function debounce(fn, time, immediate) {
  let timer = null;
  return function () {
    let that = this,
      args = arguments; // 事件回调函数中的参数
    if (timer) clearTimeout(timer);
    if (!immediate) {
      timer = setTimeout(() => {
        fn.apply(that, args); // 使用apply将fn函数中的this，指向绑定时间的DOM元素
      }, time);
    } else {
      timer = setTimeout(() => (timer = null), time);
      fn.apply(that, args); // 使用apply将fn函数中的this，指向绑定时间的DOM元素
    }
  };
}

/**
 * throttle。节流的概念可以想象一下水坝，你建了水坝在河道中，不能让水流动不了，你只能让水流慢些。
 * 换言之，你不能让用户的方法都不执行。如果这样干，就是debounce了。为了让用户的方法在某个时间段内只执行一次，我们需要保存上次执行的时间点与定时器。
 * 函数节流会用在比input, keyup更频繁触发的事件中，如resize, touchmove, mousemove, scroll
 * @param {function} fn
 * @param {number} wait
 */
export function throttle(fn, wait) {
  let flag;
  return function () {
    let context = this,
      args = arguments;
    if (!flag) {
      flag = setTimeout(() => {
        fn.apply(context, args);
        flag = false;
      }, wait);
    }
  };
}
