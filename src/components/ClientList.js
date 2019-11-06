import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';

class ClientList extends React.Component {
  state = { clients: [] };

  constructor(props) {
    super(props);
    this.getClients().then(
      (data) => this.setState({ clients: data.results.features }),
      (error) => console.log(error))
  }  

  getClients = () => {
    return this.props.getClients();
  }

  listClients = () => {
    let items = [];
    this.state.clients.forEach(client => {
      let tipoUsuario = client.properties.is_delivery ? "Delivery" : "Usuario";
      let premium = client.properties.is_premium ? "PREMIUM": "";
      items.push(<ListCard key={client.id} 
        title={client.properties.username}
        subtitle={client.properties.first_name + " " + client.properties.last_name}
        description={ <span>{tipoUsuario}  <b>{premium}</b></span> } >
        </ListCard>)
    });
    return items;
  }

  render() {
    return (
      <div>  
        <h1>Clientes</h1>
        <Grid container spacing={4}>
          {this.listClients()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getClients: () => dispatch(ACTIONS.simpleGet('/clients/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList)