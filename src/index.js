import React from "react";
import ReactDOM from "react-dom";
import { Map } from "immutable";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { number: 0, counter: { number: -1 } };
    this.state = { number: 0, counter: Map({ number: -1 }) };
    this.inputRef = React.createRef();
  }

  add = () => {
    const { number, counter } = this.state;
    let aoumt = parseInt(this.inputRef.current.value);
    // this.setState({ number: this.state.number + aoumt });

    this.setState({ counter: counter.set("number", counter.get('number') + aoumt) });
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

class Couter extends React.PureComponent {
  render() {
    console.log("Couter render");

    return <div>{this.props.data.get("number")}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
