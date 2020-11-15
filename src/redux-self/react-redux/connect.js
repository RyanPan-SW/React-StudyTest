import React from 'react'
import { bindActionCreators } from 'redux'
import ReactReduxContext from './context'

function connect(mapStateToProps, mapDispatchToProps) {
  return function (oldComponent) {
    return class extends React.Component {

      static contextType = ReactReduxContext

      constructor(props, context) {
        super(...arguments)
        this.state = mapStateToProps(this.context.store.getState())
      }

      componentDidCatch() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()))

        })
      }

      UNSAFE_componentWillMount() {
        this.unsubscribe()
      }

      render() {
        let bindAction = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)

        return <oldComponent {...this.state
        } {...bindAction} />
      }
    }

  }
}

export default connect