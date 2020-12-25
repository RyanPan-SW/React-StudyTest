import React from "react";
import ReactDOM from "react-dom";
import LayoutSiderDemo from "./layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <LayoutSiderDemo />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
