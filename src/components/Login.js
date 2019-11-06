import React from 'react';
import SignInSide from './SignIn'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  state = {};

  loginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.props.isLogged === true) {
      return <Redirect to='/app' />
    }
    return (<SignInSide 
      handleLogin={this.loginHandler.bind(this)}
      handleChange={this.handleChange.bind(this)}
      ></SignInSide>)
    }
}


const mapStateToProps = (state) => (
  {
    token: state.token, 
    isLogged: state.isLogged, 
    username: state.username, 
    password: state.password
  });


const mapDispatchToProps = dispatch => ({
  login: (user, pass) => dispatch(ACTIONS.login(user, pass))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)