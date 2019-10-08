import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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

class Users extends React.Component {  
  logout = () => {
    this.props.logout();
  }

  render() {
    return (
    <div style={classes.container}>
      <CssBaseline />
      <AppBar position="absolute" color="default" style={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap onClick={this.logout} style={{cursor: 'pointer'}}>
            Foodie
          </Typography>
        </Toolbar>
      </AppBar>
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
                id="firstName"
                name="firstName"
                label="Nombre"
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Apellido"
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Dirección"
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Ciudad"
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="Provincia" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Código Postal"
                fullWidth
                autoComplete="billing postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="País"
                fullWidth
                autoComplete="billing country"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Acepto los términos y condiciones"
              />
            </Grid>
            <Grid item xs={12}>
              <Link to="/home">
                <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                >
                Crear Usuario
                </Button>
              </Link>
            </Grid>
          </Grid>
        </main>
      </div>
    )}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(ACTIONS.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)