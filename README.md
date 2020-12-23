## React 优化方法

> 前言：在前端项目越来越庞大的金 Tina，优化是个必不可少的话题。面试、网文推荐也时常会看到这个话题，这里收录了一些 React 项目项目中用到，和平时学习中遇到的优化方案，仅供参考--不定期更新。

React 的性能优化大致主要有两点
第一点：

- 减少 `render` 次数（`immutable data`、`shouldComponentUpdate`、`PureComponent`）
- 减少 `render` 复杂度 (`memoize-one`)

第二点：

- 就是在项目中比如骨架屏、长列表、懒加载、预加载等方法，来提升用户体验方面的优化

目录：
性能的优化：

1. [方法一、用 Component 还是 PureComponent](#方法一componment、PureComponment)
2. [方法二、React.memo()方法](<#方法二React.memo()>)
3. [方法三、unstable_useDeferredValue API](#方法三unstable_useDeferredValue)
4. [方法四、immutable](#方法四immutable)
5. [方法五、memoize-one](#方法五memoize-one)

用户体验优化：
...(更新中)

### 方法一、componment、PureComponment

---

> React.PureComponent 与 React.Component 几乎完全相同，区别就在于， React.PureComponent 通过 props 和 state 的浅对比来实现 shouldComponentUpate()。

- PureComponment 的优缺点
  > 优点：不需要开发者自己实现 shouldComponentUpdate，就可以进行简单的判断来提升性能。<br/>
  > 缺点： 可能会因深层的数据不一致而产生错误的否定判断，从而 shouldComponentUpdate 结果返回 false，界面得不到更新。为了解决这一问题，可以一使用`Immutable`<br/>

### 方法二、React.memo()

---

> 在纯展示组件中，可以使用 React.memo(),将组件包裹一下，在使用就不会造成组件重渲染。

### 方法三、unstable_useDeferredValue

---

这是一个官方提供的 API

> 由于 React 的性能问题，会造成`CUP的瓶颈`和`IO的瓶颈`,例如在渲染长列表的的时候，就可以遇到渲染的问题。<br/>

> [CPU 的瓶颈](https://react.iamkasong.com/preparation/idea.html#io%E7%9A%84%E7%93%B6%E9%A2%88)

> 考虑下如果渲染 3000 个<button>li</button>

```js
function App() {
  const len = 3000;
  return (
    <ul>
      {Array(len)
        .fill(0)
        .map((_, i) => (
          <li>{i}</li>
        ))}
    </ul>
  );
}

const rootEl = document.querySelector("#root");
ReactDOM.render(<App />, rootEl);
```

参考这里的两个`DOME` ：[同步更新](https://codesandbox.io/s/pensive-shirley-wkp46) vs [异步更新](https://codesandbox.io/s/infallible-dewdney-9fkv9) Demo

### 方法四、immutable

---

主要用来避免解决对象赋值过程中深拷贝的问题。在分支中有简单的使用例子。

例子：父组件给自组件传递一个 number，自组件用来展示

```js
import React from "react";
import ReactDOM from "react-dom";

// 父组件
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, counter: { number: -1 } };
    this.inputRef = React.createRef();
  }

  add = () => {
    const { counter } = this.state;
    let aoumt = parseInt(this.inputRef.current.value);
    this.setState({ counter: { number: counter.number + aoumt } });
  };

  render() {
    console.log("App render");

    return (
      <div>
        <Couter data={this.state.counter} />
        <input type="text" ref={this.inputRef} />
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}

// 子组件
class Counter extends React.PureComponent {
  render() {
    console.log("Couter render");
    return <div>{this.props.data.number}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

问题，在父组件中修改了值之后会造成自组件 Counter 的重新<button>render</button>,就算 +0，没有改变父组件的值 Counter 也是会重新 render ，当 Counter 使用的是 PureComponent，但是如果修改的是 counter 对象中的某个值，也是同样的会重新 render，接下来就可以使用 immutable 优化了

使用`immutable`优化之后

```js
import React from "react";
import ReactDOM from "react-dom";
import { Map } from "immutable"; // 1.引入immutable

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { number: 0, counter: { number: -1 } }; // default
    this.state = { number: 0, counter: Map({ number: -1 }) }; // 2. immutable 创建对象
    this.inputRef = React.createRef();
  }

  add = () => {
    const { counter } = this.state;
    let aoumt = parseInt(this.inputRef.current.value);
    // this.setState({ counter: { number: counter.number + aoumt } }); // default
    this.setState({ counter: counter.set("number", counter.get("number") + aoumt) }); // 修改state
  };

  render() {
    console.log("App render");

    return (
      <div>
        <Couter data={this.state.counter} />
        <input type="text" ref={this.inputRef} />
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}

class Counter extends React.PureComponent {
  render() {
    console.log("Couter render");
    // return <div>{this.props.data.number}</div>; // default
    return <div>{this.props.data.get("number")}</div>; // 3. 获取key对应的value
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### 方法五、memoize-one

---

- 先看一个简单非组件、存在的问题，如下

```js
class Example extends Component {
  state = {
    filterText: "",
  };

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    const filteredList = this.props.list.filter(item => item.text.includes(this.state.filterText));

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {filteredList.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
```

该组件接收父组件传递的 list，筛选出包含 filterText 的 filteredList 并进行展示。
在未进行任何处理的情况下，父组件 render，总会导致子组件 render，即使子组件的 state/props 并未发生变化，如果筛选的数据量大，筛选逻辑复杂，这将是一个很重要的优化点。

- memoized-one、基本使用

```js
import memoize from "memoize-one";

const add = (a, b) => a + b; // 基本计算方法
const memoizedAdd = memoize(add); // 生成可缓存的计算方法

memoizedAdd(1, 2); // 3

memoizedAdd(1, 2); // 3
// Add 函数没有被执行：上一次的结果直接返回

memoizedAdd(2, 3); // 5
// Add 函数被调用获取新的结果

memoizedAdd(2, 3); // 5
// Add 函数没有被执行：上一次的结果直接返回

memoizedAdd(1, 2); // 3
// Add 函数被调用获取新的结果
// 即使该结果在之前已经缓存过了
// 但它并不是最近一次的缓存结果，所以缓存结果丢失了
```

优化案例

```js
import memoize from "memoize-one";

class Example extends Component {
  state = { filterText: "" };

  // 只有在list或filterText改变的时候才会重新调用真正的filter方法（memoize入参）
  filter = memoize((list, filterText) => list.filter(item => item.text.includes(filterText)));

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // 在上一次render后，如果参数没有发生改变，`memoize-one`会重复使用上一次的返回结果
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {filteredList.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
```

[React](./README.md)
