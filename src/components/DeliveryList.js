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
      let tipoUsuario = "Delivery";
      let premium = delivery.properties.is_premium ? "PREMIUM": "";
      items.push(<ListCard key={delivery.id} 
        id={delivery.id}
        title={delivery.properties.username}
        subtitle={delivery.properties.first_name + " " + delivery.properties.last_name}
        description={ <span>{tipoUsuario}  <b>{premium}</b></span> }
        editable={true}
        urlImage={"https://icon-library.net/images/delivery-icon-png/delivery-icon-png-19.jpg"} >
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
  getDeliveries: () => dispatch(ACTIONS.simpleGet('/deliveries'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList)