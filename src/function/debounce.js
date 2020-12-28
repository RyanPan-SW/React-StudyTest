// 防抖
export function debounce(fn, time, immediate) {
  let timer = null;
  return function () {
    let that = this,
      args = arguments;

    if (timer) clearTimeout(timer);
    if (!immediate) {
      // 非立即执行
      timer = setTimeout(() => {
        fn.apply(that, args);
      }, time);
    } else {
      let callNow = !timer;
      timer = setTimeout(() => (timer = null), time);
      callNow && fn.apply(that, args);
    }
  };
}


// window.addEventListener("scroll", throttle(showTop, 2000));

// 节流例子🌰

// 节流
export function throttle(fn, time) {
  let flag;
  return function () {
    let context = this,
      args = arguments;
    if (!flag) {
      flag = setTimeout(() => {
        fn.apply(context, args);
        flag = false;
      }, time);
    }
  };
}
