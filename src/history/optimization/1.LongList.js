import React from "react";
import ReactDOM from "react-dom";
import Example from "./components/Example";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Example />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
