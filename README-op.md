### React 优化方法

- 方法一

  > componment、PureComponment

  > React.PureComponent 与 React.Component 几乎完全相同，区别就在于， React.PureComponent 通过 props 和 state 的浅对比来实现 shouldComponentUpate()。

* PureComponment 的优缺点
  > 优点：不需要开发者自己实现 shouldComponentUpdate，就可以进行简单的判断来提升性能。<br/>
  > 缺点： 可能会因深层的数据不一致而产生错误的否定判断，从而 shouldComponentUpdate 结果返回 false，界面得不到更新。为了解决这一问题，可以一使用`Immutable`<br/>
  > 具体实现在代码，`react-self/ReactComponent`中有实现逻辑

- 方法二

  > 在纯展示组件中，可以使用 React.memo(),将组件包裹一下，在使用，就不会造成组件重渲染。

- 方法三

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

  参考下面两个`DOME`,同步更新 vs 异步更新 Demo

  [同步更新](https://codesandbox.io/s/pensive-shirley-wkp46) | [异步更新](https://codesandbox.io/s/infallible-dewdney-9fkv9)

#

[React](./README.md)

#

[Sage](./README-sage.md)

#

[CONNECT](./README-connect.md)

#

[Immutable](./README-immutable.md)
