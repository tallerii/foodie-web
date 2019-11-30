import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import BuildIcon from '@material-ui/icons/Build';
import ListIcon from '@material-ui/icons/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddUser from './AddUser'
import ClientList from './ClientList'
import DeliveryList from './DeliveryList'
import OrderList from './OrderList'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import {
  Route,
  Switch,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#dedede'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => { 
    dispatch(ACTIONS.logout())
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    props.logout();
  }

  const grayedListItem = {
    backgroundColor: '#dfe8ec'
  }

  let { path, url } = useRouteMatch();

  const mainListItems = (
    <div>
      <ListItem style={grayedListItem}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
      <Link to={`${url}/clients`}>
        <ListItem button>
          <ListItemIcon>
            <PersonPinIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
      </Link>
      <Link to={`${url}/deliveries`}>
        <ListItem button>
          <ListItemIcon>
            <DirectionsBikeIcon />
          </ListItemIcon>
          <ListItemText primary="Deliveries" />
        </ListItem>
      </Link>
      <Link to={`${url}/user/add`}>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>          
          <ListItemText primary="Crear Usuario" />
        </ListItem>
      </Link>
      <Divider />
      <ListItem style={grayedListItem}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
      </ListItem>
      <Link to={`${url}/orders`}>
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Ver Pedidos" />
        </ListItem>
      </Link>
      <Divider />
      <ListItem style={grayedListItem}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Herramientas" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Estadísticas" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Balance" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText primary="Suscripciones" />
      </ListItem>
    </div>
  );

  if (props.isLogged === false)
    return <Redirect to='/login' />
  else
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={logout}>
            Foodie
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <CssBaseline />
                  <AppBar position="absolute" color="default" >
                    <Toolbar>
                      <Typography variant="h6" color="inherit" noWrap onClick={logout}>
                        Foodie
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Switch>  
                    <Route path={`${path}/user/add`}>
                        <AddUser key="add"/>
                    </Route>
                    <Route path={`${path}/clients/edit`}>
                        <AddUser key="editCli"/>
                    </Route>
                    <Route path={`${path}/clients`}>
                        <ClientList/>
                    </Route>
                    <Route path={`${path}/deliveries/edit`}>
                        <AddUser key="editDel"/>
                    </Route>
                    <Route path={`${path}/deliveries`}>
                        <DeliveryList/>
                    </Route>
                    <Route path={`${path}/orders`}>
                        <OrderList/>
                    </Route>
                  </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
});