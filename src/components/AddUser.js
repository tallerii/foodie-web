import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import SimpleModal from './common/SimpleModal'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";

const classes = {
  layout: {
    width: 'auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    paddingLeft: '20%',
    paddingRight: '20%',
  }
};

class AddUser extends React.Component {
  initialState = { 
    is_premium: false, 
    is_delivery: false, 
    firstname: undefined,
    lastname: undefined,
    username: undefined,
    password: undefined,
    FCMToken: 'FakeToken',
    showModal: false };
  state = this.initialState;

  createUserHandler = event => {
    event.preventDefault();
    if(
      this.isNotNull(this.state.is_premium) &&
      this.isNotNull(this.state.is_delivery) &&
      this.isNotNull(this.state.firstname) &&
      this.isNotNull(this.state.lastname) &&
      this.isNotNull(this.state.username) &&
      this.isNotNull(this.state.password) &&
      this.isNotNull(this.state.FCMToken)
    ) {
      this.props.addUser(
        { 
          is_premium: this.state.is_premium,
          is_delivery: this.state.is_delivery,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          password: this.state.password,
          FCMToken: this.state.FCMToken
        }
        ).then(
        (data) => this.setState(this.initialState),
        (error) => console.log('ERROR')
      );
    } else {
      this.setState({showModal: true});
    }
    
  };

  isNotNull(value) {
    return value != undefined;
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  closeModalCallback = () => {
    this.setState({showModal: false});
  }

  render() {
    function ErrorModal(props) {
      if (props.showModal) {
        return <SimpleModal onClose={props.onClose} />;
      }
      return <div></div>;
    }
    
    return (
      <main style={classes.layout}>
          <Typography component="h1" variant="h4" align="center">
            Alta de Usuario
          </Typography>
          <Typography variant="h6" gutterBottom>
            Información General
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                label="Nombre"
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                label="Apellido"
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Nombre de Usuario"
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Contraseña"
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox
                  name="is_premium"
                  checked={this.state.is_premium}
                  onChange={this.handleCheckboxChange('is_premium')}
                  value="is_premium"
                  color="primary"
                />
              }
              label="Premium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox
                  name="is_delivery"
                  checked={this.state.is_delivery}
                  onChange={this.handleCheckboxChange('is_delivery')}
                  value="is_delivery"
                  color="primary"
                />
              }
              label="Delivery"
            />
            </Grid>
            <Grid item xs={12}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.createUserHandler} >
              Crear Usuario
              </Button>
            </Grid>
          </Grid>
          <ErrorModal showModal={this.state.showModal} onClose={this.closeModalCallback} />
        </main>
    )}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addUser: (dataMap) => dispatch(ACTIONS.simplePost('/clients/', dataMap))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)