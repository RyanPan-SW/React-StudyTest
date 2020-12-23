// import '../wdyr';
import React from "react";
import ReactDOM from "react-dom";
import { Map } from "immutable";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { number: 0, counter: { number: -1 } }; // default
    this.state = { number: 0, counter: Map({ number: -1 }) }; // immutable
    this.inputRef = React.createRef();
  }

  add = () => {
    const { counter } = this.state;
    let aoumt = parseInt(this.inputRef.current.value);
    // this.setState({ counter: { number: counter.number + aoumt } }); // default
    this.setState({ counter: counter.set("number", counter.get("number") + aoumt) }); // immutable
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


ReactDOM.render(<App />, document.getElementById("root"));
