import React from "react";
import ReactDOM from "react-dom";

// import React from "./react-self/react";
// import ReactDOM from "./react-self/react-dom";

let ThemeContext = React.createContext();

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "red" };
  }

  changeColor = color => {
    let r = Math.floor(Math.random() * 280);
    let g = Math.floor(Math.random() * 280);
    let b = Math.floor(Math.random() * 280);
    let a = Math.floor(Math.random() * 100);
    if (color) {
      this.setState({ color });
    } else {
      this.setState({ color: `rgba(${r},${g},${b},${a})` });
    }
  };

  render() {
    let value = { color: this.state.color, changeColor: this.changeColor };

    return (
      <ThemeContext.Provider value={value}>
        <div>
          <ChildCom />
          <ChildCom2 />
          <ChildCom3 />
        </div>
      </ThemeContext.Provider>
    );
  }
}

class ChildCom extends React.Component {
  static contextType = ThemeContext;
  render() {
    console.log("🚀 ~ file: index.js ~ line 45 ~ ChildCom ~ contextType", this);
    return (
      <div style={{ backgroundColor: this.context.color, marginTop: 10 }} onClick={() => this.context.changeColor()}>
        Grand color 1
      </div>
    );
  }
}

class ChildCom2 extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <div style={{ backgroundColor: this.context.color, marginTop: 10 }}>Grand color 2222</div>;
  }
}

function ChildCom3(props) {
  return (
    <ThemeContext.Consumer>
      {value => (
        <div style={{ backgroundColor: value.color, marginTop: 10 }} onClick={() => value.changeColor("green")}>
          Grand color 333
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

ReactDOM.render(<ClassComponent />, document.getElementById("root"));
