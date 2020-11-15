import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import './App.css';


function Parent() {
  let [number, setNumber] = useState(0);
  let parentRef = useRef();//{current:null} //每次都会返回同一个对象

  const getFocus = () => {
    //希望在父组件只能调用focus方法，其它的方法都不能调用
    parentRef.current.focus();//current是此input框 的真实DOM元素
    //inputRef.current.value = 'something';
    // parentRef.current.setValue('something');
  }
  return (
    <>
      <ForwardedChild ref={parentRef} />
      <button onClick={() => setNumber(prevState => prevState + 1)}>+</button>
      <button onClick={getFocus}>获得焦点</button>
    </>
  )

}



//一定是第个参数
function Child(props, parentRef) {
  // let inputRef = useRef();
  /*   useImperativeHandle(parentRef, () => (
      {
        focus() {
          inputRef.current.focus();
        },
        setValue(newVal) {
          inputRef.current.value = newVal;
        }
      }
    )); */
  return (
    <>
      <input type="text" ref={parentRef} />
    </>
  )

}

let ForwardedChild = forwardRef(Child);

export default Parent;
