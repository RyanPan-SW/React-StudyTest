import React from "react";

export class FixedSizeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0, // 要显示的元素的起始索引 0 ～ index
    };
    this.containterRef = React.createRef();
  }

  componentDidMount() {
    const { itemSize } = this.props;
    this.containterRef.current.addEventListener("scroll", () => {
      let scrollTop = this.containterRef.current.scrollTop || 0;
      console.log(this.containterRef.current.scrollTop);
      let start = Math.floor(scrollTop / itemSize);
      this.setState({ start: start });
    });
  }

  componentWillUnmount() {
    // this.containter.current.removeEventListener();
  }

  render() {
    const { start } = this.state;
    const { height, width, itemCount, itemSize, className, children } = this.props; // 依次: 宽、高、条目数量、条目高度
    let containerStyle = {
      position: "relative",
      height,
      width,
      overflow: "auto",
      // willChange: "transform",
      // direction: "ltr",
    };

    let childrenArray = [];
    let pagesize = Math.floor(height / itemSize) + 2;
    let itemStyle = { height: itemSize, width: "100%", position: "absolute", left: 0, top: 0 };
    for (let i = start; i < start + pagesize; i++) {
      let style = { ...itemStyle, top: i * itemSize };
      childrenArray.push(children({ index: i, style }));
    }
    return (
      <div className={className} style={containerStyle} ref={this.containterRef}>
        <div style={{ height: itemSize * itemCount, width: "100%" }}>{childrenArray}</div>
      </div>
    );
  }
}
