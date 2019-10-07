import React from 'react'
import { connect } from "react-redux";

class App extends React.Component {  
  render() {
    var current = this.props.location.pathname;
    var isLogged = this.props.isLogged;
    if (isLogged || current === '/login') {
        if (current === '/') {
          this.props.history.push('/users')
        }
        return <div></div>
    } else {
      if(this.props.location.pathname !== '/') {
          this.props.history.push('/login?returnUrl='+this.props.location.pathname)
      } else {
          this.props.history.push('/login')
      }
      return <div></div>
    }
  }
}

const mapStateToProps = state => ({
  isLogged: state.isLogged
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)