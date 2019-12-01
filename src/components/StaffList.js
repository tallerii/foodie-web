import React from 'react'
import { connect } from "react-redux";
import ACTIONS from "../modules/action";
import ListCard from "./common/ListCard"
import Grid from '@material-ui/core/Grid';

class StaffList extends React.Component {
  state = { staffs: [] };

  constructor(props) {
    super(props);
    this.getStaffs().then(
      (data) => this.setState({ staffs: data.results.features }),
      (error) => console.log(error))
  }  

  getStaffs = () => {
    return this.props.getStaffs();
  }

  listStaffs = () => {
    let items = [];
    this.state.staffs.forEach(staff => {
      let tipoUsuario = "Staff";
      let premium = staff.properties.is_premium ? "PREMIUM": "";
      items.push(
        <ListCard key={staff.id}
          id={staff.id}
          title={staff.properties.username}
          subtitle={staff.properties.first_name + " " + staff.properties.last_name}
          description={ <span>{tipoUsuario}  <b>{premium}</b></span> }
          urlImage={"https://previews.123rf.com/images/alekseyvanin/alekseyvanin1704/alekseyvanin170400127/75320517-personne-ic%C3%B4ne-de-la-ligne-utilisateur-signe-de-vecteur-de-contour-pictogramme-lin%C3%A9aire-isol%C3%A9-sur-blanc-ill.jpg"} >
        </ListCard>
      )
    });
    return items;
  }

  render() {
    return (
      <div>  
        <h1>Staff</h1>
        <Grid container spacing={4}>
          {this.listStaffs()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getStaffs: () => dispatch(ACTIONS.simpleGet('/staffs'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffList)