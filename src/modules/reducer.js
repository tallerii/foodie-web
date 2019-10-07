import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  items: []
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.LOGIN: {
        console.log(action);
        let newState = _.cloneDeep(state);
        newState.isLogged = true;
        console.log('Login with: ' + action.payload.user + ', ' + action.payload.pass);
        console.log(newState);
        return newState;
    }
    
    default:
      return state;
  }
};

export default todoReducer;