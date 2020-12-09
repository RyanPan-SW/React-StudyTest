import React from "react";
import ReactDOM from "react-dom";

/* class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, a: 1 };
  }

  onMouseMove = event => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    const { x, y } = this.state;
    return (
      <div onMouseMove={this.onMouseMove} style={{ width: 500, height: 500 }}>
        {this.props.render({ x, y })}
      </div>
    );
  }
}

ReactDOM.render(
  <ClassComponent
    render={value => {
      console.log("object", value);
      return (
        <>
          <div>mouse offset</div>
          <p>
            {value.x}: {value.y}
          </p>
        </>
      );
    }}
  />,
  document.getElementById("root")
); */

function WithHight(OldComponent) {
  return class ClassComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0, a: 1 };
    }

    onMouseMove = event => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.onMouseMove} style={{ width: 500, height: 500 }}>
          <OldComponent {...this.state} />
        </div>
      );
    }
  };
}
function Show(props) {
  return (
    <>
      <div>mouse offset</div>
      <p>
        {props.x}: {props.y}
      </p>
    </>
  );
}

let HightComponent = WithHight(Show);

ReactDOM.render(<HightComponent />, document.getElementById("root"));
