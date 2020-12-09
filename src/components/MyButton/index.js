import { Button } from "antd";
import React, { Component } from "react";
import styles from "./index.less";

export default class MyButton extends Component {
  render() {
    let { onClick, colors, className, ...others } = this.props;
    return (
      <Button className={`${className} my-button-wrap button-${colors}`} onClick={e => onClick(e)} {...others}></Button>
    );
  }
}
