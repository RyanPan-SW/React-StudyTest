# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`


### 8.useLayoutEffect
+ 其函数签名与`useEffect`相同，但是他会在所有的DOM变更之后同步调用Effect
+ 可以使用`useLayoutEffect`来读取DOM布局，并同步触发重渲染
+ 在浏览器执行绘制之前，`useLayoutEffect`内部的更新计划将被同步执行
+ 尽可能的使用标准的 ·useEffect·以避免阻塞试图更新

### 9.自定义Hook 
+ 有时候我们想要在组件之间复用一些状态逻辑
+ 自定义Hook 可以让你在不增加组件的情况下达到相同的目的
+ Hook 是一种复用状态的逻辑方式，他不服用 state 本身，事实上Hook的每次调用都有一个完全独立的state
+ 自定义的hook更新是一种约定，而不是一种功能，如果函数的名字一use开头，并且调用了其他的hook，则称为自定义Hook