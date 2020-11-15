import React, { PureComponent } from 'react'


class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      divList: [
        { id: "a1", text: "1" },
        { id: "a2", text: "2" },
        { id: "a3", text: "3" },
      ],
      counrent: 0,
    };
  }

  interval = () => {
    // setTimeout(() => {
    this.setState({ counrent: this.state.counrent + 1 });
    console.log(this.state.counrent);
    // }, 2000);
  };

  changeList = () => {
    this.setState({
      divList: [
        { id: "a2", text: "2" },
        { id: "a1", text: "1" },
        { id: "a3", text: "3" },
      ],
    });
  };

  render() {
    return (
      <div id="a1">
        <p>Countent</p>
        <p>{this.state.counrent}</p>
        <button
          onClick={this.interval}
          // onClick={this.changeList}
        >
          setState
        </button>

        {this.state.divList.map((item, key) => {
          return (
            <div>
              {item.text}: <input type="text" defaultValue={item.id} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Counter;
