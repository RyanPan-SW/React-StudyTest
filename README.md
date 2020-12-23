## Immutable

---

### 1.可共享可改变状态是万恶之源

```js
let objA = { name: "zhangsanfeng" };
let bojB = objA;
objB.name = "9";
console.log(objA.name);
```

### 2. 什么是 Immutable

[npm 地址](https://www.npmjs.com/package/immutable)

- Immutable data 是一旦创建，就不能被更改的数据。对 Immutable 对象的任何修改、添加、删除操作都会返回一个新的 `Immutable` 对象
- Immutable 实现的原理是 Persistent Data Structure （持久化数据结构），也就是使用数据创建新数据时候，要保证就数据同时可用且不变，同时为了所有节点都复制一遍带来的性能消耗。
- Immutable 使用了 Structural Sharing （结构共享），即如果对象树中一个节点发生变化，只修改这个节点和他受影响的节点，其他阶段俄进行共享。

### 3. Immutable 类库

内部实现了一套完整的 Persistent Data Structure，还有很多医用的数据类型。像： `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`

| 方法     | 作用             |
| -------- | ---------------- |
| isMap    | 判断是否是 Map   |
| clear    | 清空值           |
| set      | 设置值           |
| delete   | 删除值           |
| update   | 更新             |
| merge    | 合并             |
| setIn    | 设置值           |
| deleteIn | 删除值           |
| updateIn | 更新值           |
| mergeIn  | 合并             |
| get      | 获取值           |
| getIn    | 获取值           |
| keys     | key 的数组       |
| values   | values 的数组    |
| entries  | entry 的数组     |
| toJS     | 转成普通 JS 对象 |
| toObject | 转成普通对象     |
| toJSON   | 转成 JSON 对象   |
| toArray  | 转成数组         |
