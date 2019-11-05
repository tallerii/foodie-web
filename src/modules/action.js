import ls from 'local-storage'
import { post } from '../services/base-service'

// types of action
const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REDIRECT: "REDIRECT",
    SET_STATE: "SET_STATE",
    SET_STATES: "SET_STATES"
};

// actions
const setState = (key, value) => ({
    type: Types.SET_STATE,
    payload: {key: key, value: value}
});

const setStates = (keyMap) => ({
    type: Types.SET_STATES,
    payload: keyMap
});


const logout = () => ({
    type: Types.LOGOUT,
    payload: {}
});

  function doLogin(user, pass) {
    const formData  = new FormData();
    formData.append('username', user);
    formData.append('password', pass);
    let res = post('/token-auth/username/', formData);    
    return res;
  }
  
  function login(user, pass) {
    return function(dispatch, getState) {
      return doLogin(user, pass).then(
        (data) => {
            if(data.ok) {
                let res = data.json()
                res.then(data => {
                    ls.set('token', data.token);
                    ls.set('isLogged', true);
                    dispatch(setStates([{ key: 'token', value: data.token }, { key: 'isLogged', value: true } ]))
                })
                return res;
            } else {
                ls.set('token', undefined);
                ls.set('isLogged', false);
                dispatch(setStates([{ key: 'token', value: undefined }, { key: 'isLogged', value: false } ]))
            }
        },
        (error) => error,
      );
    };
  }

export default {
    setState,
    setStates,
    login,
    logout,
    Types
};