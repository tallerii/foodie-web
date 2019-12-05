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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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
  isEdition = false;
  splittedURL = [];
  currentURL = '';
  userType = '';

  initialState = { 
    id: '',
    is_premium: false, 
    is_delivery: false, 
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    FCMToken: '-',
    showModal: false,
    userType: '',
    balance: 0,
    initialBalance: 0 };
  state = this.initialState;

  constructor(props) {
    super(props);
    let url = window.location.href;
    this.currentURL = url;
    this.splittedURL = url.split('/');
    let action = this.splittedURL[this.splittedURL.length-2];
    this.isEdition = (action === 'edit');
  }
  
  componentDidMount() {
    this.userType = this.splittedURL[this.splittedURL.length-3];    
    let userId = this.splittedURL[this.splittedURL.length-1];
    if(this.isEdition) {
      this.props.getOne('/' + this.userType + '/' + userId)
      .then(
        (data) => { 
          this.userToState(data);
        },
        (error) => this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error', showModal: true})
      );
      if (this.userType == 'deliveries') {
        this.props.getOne('/' + this.userType + '/' + userId + '/balance')
        .then(
          (data) => { 
            this.setState({ ...this.state, 
              balance: (data && data.balance) ? data.balance : 0,
              initialBalance: (data && data.balance) ? data.balance : 0
            })
          },
          (error) => this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error', showModal: true})
        );
      }
    }
  }

  createUserHandler = event => {
    event.preventDefault();
    if(
      this.isNotNull(this.state.is_premium) &&
      this.isNotNull(this.state.firstname) &&
      this.isNotNull(this.state.lastname) &&
      (this.isEdition || this.isNotNull(this.state.password)) &&
      this.isNotNull(this.state.email) &&
      this.isNotNull(this.state.FCMToken) &&
      this.isNotNull(this.state.userType)
    ) {
      let urlType = (this.state.userType === 'Delivery') ? '/deliveries' : (this.state.userType === 'Cliente') ? '/clients' : '/staffs';
      let url = (this.isEdition) ? '/' + this.userType : urlType;
      let action = (this.isEdition) ? this.props.updateUser : this.props.addUser; 
      url = (this.isEdition) ? url + '/' + this.state.id : url
      action(
        this.stateToUser(),
        url
        ).then(
        (data) => { 
          if (data) {
            this.setState(this.initialState);
            this.setState({modalTitle: 'Éxito', modalDescription: 'El usuario ha sido ' + ((this.isEdition) ? 'modificado' : 'creado'), showModal: true});
          } else {
            this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error', showModal: true});
          }
        },
        (error) => this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error', showModal: true})
      );
    } else {
      this.setState({modalTitle: 'Error', modalDescription: 'Debe completar todos los campos obligatorios', showModal: true});
    }
    
  };

  updateBalanceHandler = event => {
    event.preventDefault();
    if(
      this.isNotNull(this.state.balance)
    ) {
      let urlType = '/deliveries';
      let url = '/' + this.userType;
      url += '/payment'
      this.props.postPayment(
        {
          pk: this.state.id,
          payment: this.state.initialBalance - this.state.balance
        },
        url
        ).then(
        (data) => { 
          if (data) {
            this.setState({modalTitle: 'Éxito', modalDescription: 'Se ha actualizado el balance.', showModal: true});
            window.location.reload();
          } else {
            this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error al realizar el pago', showModal: true});
          }
        },
        (error) => this.setState({modalTitle: 'Error', modalDescription: 'Ha ocurrido un error al realizar el pago', showModal: true})
      );
    } else {
      this.setState({modalTitle: 'Error', modalDescription: 'Debe completar el campo Balance', showModal: true});
    }
    
  };

  stateToUser() {
    let res = { 
      is_premium: this.state.is_premium,
      is_delivery: this.state.is_delivery,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      username: this.state.email,
      email: this.state.email,
      FCMToken: this.state.FCMToken
    };
    if (!this.isEdition) {
      res.password = this.state.password;
    }
    return res;
  }

  userToState(user) {
    let properties = user.properties;
    let userType = (this.userType === 'clients') ? 'Cliente' : (this.userType === 'deliveries') ? 'Delivery' : 'Staff';
    this.setState({ ...this.state, 
      id: user.id || '',
      is_premium: properties.is_premium || false,
      is_delivery: properties.is_delivery || false,
      firstname: properties.first_name || '',
      lastname: properties.last_name || '',
      username: properties.username || '',
      password: properties.password || '',
      email: properties.username || '',
      FCMToken: properties.FCMToken || '',
      userType: userType
    });
  }

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
          {this.isEdition ? 'Edición' : 'Alta'} de Usuario
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
                id="email"
                name="email"
                label="Correo Electrónico"
                value={this.state.email}
                onChange={(event) => this.handleChange(event)}
                fullWidth
              />
            </Grid>
            {
            !this.isEdition ? (
              <Grid item xs={12} sm={6} key="passElement">
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
            ) : <div></div>
            }
            <Grid item xs={6} sm={3}>
              <FormControl style={{'margin': 'theme.spacing(1)', 'width': '100%'}}>
                <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
                <Select
                  id="demo-simple-select"
                  placeholder={"Tipo de Usuario"}
                  value={this.state.userType}
                  name="userType"
                  onChange={this.handleChange}
                  disabled={this.isEdition}
                >
                  <MenuItem value={'Cliente'}>Cliente</MenuItem>
                  <MenuItem value={'Delivery'}>Delivery</MenuItem>
                  <MenuItem value={'Staff'}>Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3} style={{'width': '100%', 'textAlign': 'center'}}>
            <FormControlLabel style={{'paddingTop': '10px'}}
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
            {
            (this.isEdition && this.userType == 'deliveries') ? (
              <Grid item xs={12} sm={6}>
                <span style={{'verticalAlign': 'bottom'}}><AttachMoneyIcon/></span>
                <TextField
                  style={{'width': '50%'}}
                  id="balance"
                  name="balance"
                  label="Balance"
                  value={this.state.balance}
                  onChange={(event) => this.handleChange(event)}
                  />
                <Button
                style={{'width': '40%', 'marginTop': '10px', 'marginLeft': '10px', 'backgroundColor': '#4fc3f7'}}
                type="submit"
                variant="contained"
                onClick={this.updateBalanceHandler} >
                Actualizar Balance
                </Button>
              </Grid> 
            ) : <div></div>
            }
            <Grid item xs={12}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.createUserHandler} >
                {this.isEdition ? 'Editar' : 'Crear'} Usuario
              </Button>
            </Grid>
          </Grid>
          <ErrorModal showModal={this.state.showModal} modalTitle={this.state.modalTitle} modalDescription={this.state.modalDescription} onClose={this.closeModalCallback} />
        </main>
    )}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addUser: (dataMap, url) => dispatch(ACTIONS.simplePost(url, dataMap)),
  updateUser: (dataMap, url) => dispatch(ACTIONS.simplePatch(url, dataMap)),
  getOne: (url) => dispatch(ACTIONS.simpleGet(url)),
  postPayment: (dataMap, url) => dispatch(ACTIONS.simplePost(url, dataMap))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)