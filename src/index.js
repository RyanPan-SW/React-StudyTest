import React, { Component } from "react";
import ReactDOM from "react-dom";
import MyButton from "./components/MyButton";

/**
 * HOC：属性代理
 */

const loading = message => OldComponent => {
  return class extends Component {
    render() {
      const state = {
        show: () => {
          let dom = document.getElementById("loading");
          if (!dom) {
            let loadmodal = document.createElement("div");
            loadmodal.innerHTML = `<p id="loading" style="position:fixed;top:100px;z-index:10;background-color:#00000034">${message}</p>`;
            document.body.appendChild(loadmodal);
          }
        },
        hide: () => {
          document.getElementById("loading").remove();
        },
      };
      return <OldComponent {...this.props} {...state} />;
    }
  };
};

let LoadingHello = loading("正在加载...")(Hello);

function Hello(props) {
  const click = e => {
    console.log("object", e);
  };

  return (
    <div>
      <p>Hello</p>
      <button onClick={props.show}>show</button>
      <button onClick={props.hide}>hide</button>
      <MyButton className={`aabbcc`} colors={"danger"} onClick={e => click(e)}>
        123
      </MyButton>
    </div>
  );
}

ReactDOM.render(<LoadingHello />, document.getElementById("root"));
