import React from "react";
import { FixedSizeList as List } from "../../react-self/react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./styles.css";

const Row = ({ index, style }) => (
  <div
    // className={index % 2 ? "ListItemOdd" : RadomColor()}
    style={{ ...style, textAlign: "center", background: index % 2 ? RadomColor() : "" }}
  >
    Row {index + 1}
  </div>
);

const Example = () => (
  // <AutoSizer>
  //   {({ height, width }) => (
  <List className="List" height={650} itemCount={1000} itemSize={35} width={"100%"}>
    {Row}
  </List>
  //   )}
  // </AutoSizer>
);

export default Example;

function RadomColor() {
  let rend = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase();
  if (rend.length === 6) {
    return `#${rend}`;
  } else {
    return RadomColor();
  }
}
