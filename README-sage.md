# Sage

---

```js
function run (sage) {
  let it = sage()
  functio next(val) {
    let {value, done} = it.sage()
    if (!done) {
      next(value)
    }
    next()
  }
}

function * sage () {
  let val01 = yield 1
  console.log('val 1', val01)
  let val02 = yield 1
  console.log('val 2', val02)
}
```

##

[React](./README.md)

##

[CONNECT](./README-connect.md)

##

[Immutable](./README-immutable.md)
