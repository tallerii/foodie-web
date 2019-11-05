import ACTIONS from "./action";
import _ from "lodash";
import ls from 'local-storage'

const defaultState = {
  items: []
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_STATE: {
      let newState = _.cloneDeep(state);
      newState[action.payload.key] = action.payload.value;
      return newState;
    }
    case ACTIONS.Types.SET_STATES: {
      let newState = _.cloneDeep(state);
      action.payload.map(element => newState[element.key] = element.value)
      return newState;
    }
    case ACTIONS.Types.LOGIN: {
      return state;
    }

    case ACTIONS.Types.LOGOUT: {
        let newState = _.cloneDeep(state);
        ls.set('isLogged', false);
        ls.set('token', undefined);
        newState.isLogged = false;
        newState.token = undefined;
        return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;