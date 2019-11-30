import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class OrderList extends React.Component {
  state = { orders: [], orderSearchInProgress: true };

  constructor(props) {
    super(props);
    this.fetchOrders(this.state.orderSearchInProgress);
  }  

  fetchOrders(orderSearchInProgress) {
    this.getOrders(orderSearchInProgress).then(
      (data) => this.setState({ orders: data.results ? data.results.features : [] }),
      (error) => console.log(error));
  }

  getOrders = (orderSearchInProgress) => this.props.listOrders(orderSearchInProgress)

  renderOrders = () => {
    let items = [];
    this.state.orders.forEach(order => {
      items.push(<ListCard key={order.id} 
        title={order.properties.client_user.properties.first_name + order.properties.client_user.properties.last_name}
        subtitle={order.properties.delivery_user.properties.first_name + order.properties.delivery_user.properties.last_name}
        description={order.properties.notes}
        urlImage={"https://previews.123rf.com/images/tatianasun/tatianasun1703/tatianasun170300065/74003740-map-pointer-with-fast-food-icon-vector-isolated-location-sign-.jpg"}>
        </ListCard>)
    });
   
    if (items.length > 0) 
    {
      return items;
    }
    else {
      return <h3 style={{'color': 'grey', 'width': '100%', 'textAlign': 'center'}}>-- No se encontraron resultados --</h3>
    }
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    if(name == 'orderSearchInProgress') {
      this.fetchOrders(event.target.checked);
    }
  };

  render() {    
    return (
      <div>  
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Pedidos    </h1>      
          </Grid>
          <Grid item xs={6} style={{'paddingTop': '35px'}} >
            <FormControlLabel
              control={
              <Checkbox
                checked={this.state.orderSearchInProgress}
                onChange={this.handleChange('orderSearchInProgress')}
                value="orderSearchInProgress"
                inputProps={{
                  'aria-label': 'indeterminate checkbox',
                }}
              />
              }
              label={ this.state.orderSearchInProgress ? "En progreso" : "Todos" }
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={4}>
          {this.renderOrders()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  listOrders: (orderSearchInProgress) => dispatch(ACTIONS.simpleGet('/orders'+ ((orderSearchInProgress) ? '?status=in_progress' : '')))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)