/**
 * 防抖函数
 * 功能：防抖和节流严格算起来应该属于性能优化的知识，但实际上遇到的频率相当高，处理不当或者放任不管就容易引起浏览器卡死。
 * @param {function} fn 防抖函数
 * @param {number} time 防抖间隔(单位：ms)
 * 场景：浏览器滚动，模糊搜索，页面改变等操作频繁，但是代码跟不上操作等场景等。
 * 初级的简单版本
 */
export function debounce(fn, time) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
}