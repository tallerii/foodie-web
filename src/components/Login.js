import React from 'react';
import SignInSide from './SignIn'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";

class Login extends React.Component {
  state = {};

  loginHandler = event => {
    this.props.login(this.state.username, this.state.password);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  render() {
    return (<SignInSide 
      handleLogin={this.loginHandler.bind(this)}
      handleChange={this.handleChange.bind(this)}
      ></SignInSide>)
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: (user, pass) => dispatch(ACTIONS.login(user, pass))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)