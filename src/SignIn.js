import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';

function Copyright() {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright} >
      {'Copyright © '}
      <Link color="inherit" href="http://taller-de-programacion-2.github.io">
        Taller de Programación II - 2c2019
      </Link>{' '}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./pizza.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
  },
  title: {
    color: theme.palette.secondary.main,
    paddingBottom: '40px'
  },
  copyright: {
    marginTop: '60px'
  },
  formControlLabel: {

  }
}));

export default function SignInSide() {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Typography component="h1" variant="h3" className={classes.title}>
                Foodie
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Usuario"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <FormControlLabel
                control={<Checkbox value="remember" className={classes.formControlLabel} />}
                label="Recordar mi usuario"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                >
                Iniciar Sesión
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    ¿Olvidó su contraseña?
                    </Link>
                </Grid>
                </Grid>
                <Box mt={5}>
                <Copyright />
                </Box>
            </form>
            </div>
        </Grid>
    </Grid>
  );
}