import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';

class OrderList extends React.Component {
  state = { orders: [] };

  constructor(props) {
    super(props);
    this.getOrders().then(
      (data) => this.setState({ orders: data.results.features }),
      (error) => console.log(error))
  }  

  getOrders = () => {
    return this.props.listOrders();
  }

  listOrders = () => {
    let items = [];
    this.state.orders.forEach(order => {
      items.push(<ListCard key={order.id} 
        title={order.properties.client_user.properties.first_name + order.properties.client_user.properties.last_name}
        subtitle={order.properties.delivery_user.properties.first_name + order.properties.delivery_user.properties.last_name}
        description={order.properties.notes}
        urlImage={"https://previews.123rf.com/images/tatianasun/tatianasun1703/tatianasun170300065/74003740-map-pointer-with-fast-food-icon-vector-isolated-location-sign-.jpg"}>
        </ListCard>)
    });
    return items;
  }

  render() {
    return (
      <div>  
        <h1>Pedidos Activos</h1>
        <Grid container spacing={4}>
          {this.listOrders()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  listOrders: () => dispatch(ACTIONS.simpleGet('/orders/active/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)