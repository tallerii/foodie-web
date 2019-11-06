import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  },
  passwordForm: {
    width: '100%'
  }
};

class AddUser extends React.Component {
  initialState = { 
    is_premium: false, 
    is_delivery: false, 
    firstname: '',
    lastname: '',
    username: '',
    password: '',
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
      let url = (this.state.is_delivery) ? '/deliveries/' :'/clients/';
      this.props.addUser(
        { 
          is_premium: this.state.is_premium,
          is_delivery: this.state.is_delivery,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          password: this.state.password,
          FCMToken: this.state.FCMToken
        }, url
        ).then(
        (data) => { 
          this.setState(this.initialState);
          this.setState({modalTitle: 'Éxito', modalDescription: 'El usuario ha sido creado', showModal: true});
        },
        (error) => this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error', showModal: true})
      );
    } else {
      this.setState({modalTitle: 'Error', modalDescription: 'Debe completar todos los campos obligatorios', showModal: true});
    }
    
  };

  isNotNull(value) {
    return value !== undefined && value !== null && value !== '';
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
    this.setState({...this.state, modalTitle: '', modalDescription: '', showModal: false});
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    function ErrorModal(props) {
      if (props.showModal) {
        return <SimpleModal onClose={props.onClose} title={props.modalTitle} message={props.modalDescription} />;
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
                value={this.state.firstname}
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
                value={this.state.lastname}
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
                value={this.state.username}
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                required
                id="password"
                name="password"
                label="Contraseña"
                value={this.state.password}
                onChange={(event) => this.handleChange(event)}
                fullWidth
              /> */}
              <FormControl style={classes.passwordForm}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={(event) => this.handleChange(event)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="cambiar visibilidad password"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
          <ErrorModal showModal={this.state.showModal} modalTitle={this.state.modalTitle} modalDescription={this.state.modalDescription} onClose={this.closeModalCallback} />
        </main>
    )}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addUser: (dataMap, url) => dispatch(ACTIONS.simplePost(url, dataMap))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)