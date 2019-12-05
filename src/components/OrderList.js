import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class OrderList extends React.Component {
  state = { pageNum: 1, orders: [], orderSearchInProgress: true };

  constructor(props) {
    super(props);
    this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum);
  }  

  fetchOrders(orderSearchInProgress, pageNum) {
    this.setState({ orders: [] });
    this.getOrders(orderSearchInProgress, pageNum).then(
      (data) => this.setState({ orders: data ? data.results : [] }),
      (error) => { 
        this.setState({ orders: [] });
        console.log(error);
        }
      )
  }

  getOrders = (orderSearchInProgress, pageNum) => this.props.listOrders(orderSearchInProgress, pageNum)

  renderOrders = () => {
    let items = [];
    this.state.orders.forEach(order => {
      try {
      items.push(<ListCard key={order.id} 
        id={order.id}
        title={order.notes}
        subtitle={'$'+order.price+' + $'+order.delivery_price}
        description={'Pide: '+ order.client_user.properties.first_name + order.client_user.properties.last_name + ' | ' + 'Entrega: ' + order.delivery_user.properties.first_name + order.delivery_user.properties.last_name}
        editable={false}
        urlImage={"https://previews.123rf.com/images/tatianasun/tatianasun1703/tatianasun170300065/74003740-map-pointer-with-fast-food-icon-vector-isolated-location-sign-.jpg"}>
        </ListCard>)
      } catch (e) {}
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
    this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum + 1);
    this.setState({ ...this.state, pageNum: (this.state.pageNum + 1) });
  }

  previous() {
    if (this.state.pageNum > 1) {
      this.fetchOrders(this.state.orderSearchInProgress, this.state.pageNum - 1);
      this.setState({ ...this.state, pageNum: (this.state.pageNum - 1) });
    }
  }

  render() {    
    return (
      <div>  
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Pedidos</h1>      
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
        <Grid container spacing={4}>
          <Button onClick={() => { this.previous() }}>Anterior</Button>
          <Typography style={{'paddingTop': '6px'}}>
            ({this.state.pageNum})
          </Typography>
          <Button onClick={() => { this.next() }}>Siguiente</Button>
        </Grid>
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