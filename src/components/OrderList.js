import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class OrderList extends React.Component {
  state = { pageNum: 1, orders: [], orderSearchInProgress: true };

  constructor(props) {
    super(props);
    this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum);
  }  

  fetchOrders(orderSearchInProgress, pageNum) {
    this.getOrders(orderSearchInProgress, pageNum).then(
      (data) => this.setState({ orders: data ? data.results : [] }),
      (error) => console.log(error));
  }

  getOrders = (orderSearchInProgress, pageNum) => this.props.listOrders(orderSearchInProgress, pageNum)

  renderOrders = () => {
    let items = [];
    this.state.orders.forEach(order => {
      items.push(<ListCard key={order.id} 
        id={order.id}
        title={order.client_user.properties.first_name + order.client_user.properties.last_name}
        subtitle={'Entrega: ' + order.delivery_user.properties.first_name + order.delivery_user.properties.last_name}
        description={order.notes}
        editable={false}
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
    if(name === 'orderSearchInProgress' || name === 'pageNum') {
      this.fetchOrders(event.target.checked, this.state.pageNum);
    }
  };

  next() {
    // this.setState({ ...this.state, pageNum: (this.state.pageNum + 1) });
    // this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum);
  }

  previous() {
    // this.setState({ ...this.state, pageNum: (this.state.pageNum - 1) });
    // this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum);
  }

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
        {/* <Grid container spacing={4}>
          <Button>Anterior</Button>
          <Button onClick={this.next()}>Siguiente</Button>
        </Grid> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  listOrders: (orderSearchInProgress, pageNum) => dispatch(ACTIONS.simpleGet('/orders'+ (((orderSearchInProgress) ? '?status=in_progress&page=' : '?page=') + (pageNum))))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)