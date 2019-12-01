import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

class Stats extends React.Component {
  state = { stats: { users: 0, orders_delivered: 0, orders_failed: 0 } };

  constructor(props) {
    super(props);
    this.props.getStats().then(
      (data) => {
        this.setState({ stats: data });
      },
      (error) => console.log(error))
  }  

  tiers = [
    {
      title: 'Usuarios',
      subheader: 'Activos',
      price: this.state.stats.users,
      description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },
    {
      title: 'Ordenes',
      subheader: 'Entregadas',
      price: this.state.stats.orders_delivered,
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
    },
    {
      title: 'Ordenes',
      subheader: 'No Entregadas',
      price: this.state.stats.orders_failed,
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
    },
  ];

  classes = {
    cardHeader: {
      backgroundColor: '#EEEEEE',
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: '10px',
      width: '100%',
      textAlign: 'center'
    }
  };

  render() {
    return (
      <div>  
        <h1>Estadísticas</h1>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Usuarios"
                subheader="Activos"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={this.classes.cardHeader}
              />
              <CardContent>
                <div className={this.classes.cardPricing} style={{'textAlign': 'center'}}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {this.state.stats.users}
                  </Typography>
                </div>
                {/* <Typography variant="subtitle1" align="center">
                  ABC
                </Typography> */}
              </CardContent>
              {/* <CardActions>
                <Button fullWidth color="primary">
                  DEFGHIJK
                </Button>
              </CardActions> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Ordenes"
                subheader="Entregadas"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={this.classes.cardHeader}
              />
              <CardContent>
                <div className={this.classes.cardPricing} style={{'textAlign': 'center'}}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {this.state.stats.orders_delivered}
                  </Typography>
                </div>
                {/* <Typography variant="subtitle1" align="center">
                  ABC
                </Typography> */}
              </CardContent>
              <CardActions>
                {/* <Button fullWidth color="primary">
                  DEFGHIJK
                </Button> */}
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title='Ordenes'
                subheader='No Entregadas'
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={this.classes.cardHeader}
              />
              <CardContent>
                <div className={this.classes.cardPricing} style={{'textAlign': 'center'}}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {this.state.stats.orders_failed}
                  </Typography>
                </div>
                {/* <Typography variant="subtitle1" align="center">
                  ABC
                </Typography> */}
              </CardContent>
              <CardActions>
                {/* <Button fullWidth color="primary">
                  DEFGHIJK
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getStats: () => dispatch(ACTIONS.simpleGet('/stats'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats)