import React from 'react'
import ReactReaducxContext from './context'

export default class Provied extends React.Component {

  render() {
    return (
      <ReactReaducxContext.Provied value={{ store: this.props.store }}>
        {this.props.children}
      </ReactReaducxContext.Provied>
    )
  }
}