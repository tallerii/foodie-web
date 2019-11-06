import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';

class ClientList extends React.Component {
  state = { deliveries: [] };

  constructor(props) {
    super(props);
    this.getDeliveries().then(
      (data) => this.setState({ deliveries: data.results.features }),
      (error) => console.log(error))
  }  

  getDeliveries = () => {
    return this.props.getDeliveries();
  }

  listDeliveries = () => {
    let items = [];
    this.state.deliveries.forEach(delivery => {
      let tipoUsuario = delivery.properties.is_delivery ? "Delivery" : "Usuario";
      let premium = delivery.properties.is_premium ? "PREMIUM": "";
      items.push(<ListCard key={delivery.id} 
        title={delivery.properties.username}
        subtitle={delivery.properties.first_name + " " + delivery.properties.last_name}
        description={ <span>{tipoUsuario}  <b>{premium}</b></span> } >
        </ListCard>)
    });
    return items;
  }

  render() {
    return (
      <div>  
        <h1>Deliveries</h1>
        <Grid container spacing={4}>
          {this.listDeliveries()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getDeliveries: () => dispatch(ACTIONS.simpleGet('/deliveries/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList)