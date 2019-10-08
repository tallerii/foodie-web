import ACTIONS from "./action";
import _ from "lodash";
import ls from 'local-storage'

const defaultState = {
  items: []
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.LOGIN: {
        let newState = _.cloneDeep(state);
        newState.isLogged = true;
        ls.set('isLogged', true);
        return newState;
    }

    case ACTIONS.Types.LOGOUT: {
        let newState = _.cloneDeep(state);
        newState.isLogged = false;
        ls.set('isLogged', false);
        return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;