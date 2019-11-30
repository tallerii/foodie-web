import React from 'react'
import { connect } from "react-redux";

class App extends React.Component {
  loginPage = '/login';
  homePage = '/app';

  render() {
    var current = this.props.location.pathname;
    var isLogged = this.props.isLogged;
    if (isLogged || current === this.loginPage) {
        if (current === '/') {
          this.props.history.push(this.homePage)
        }
        return <div></div>
    } else {
      if(this.props.location.pathname !== '/') {
          this.props.history.push(this.loginPage)
      } else {
          this.props.history.push(this.loginPage)
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