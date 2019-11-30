import ls from 'local-storage'
import { get, post, put } from '../services/base-service'

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
    let res = post('/token-auth/username', formData);    
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

  function simpleGet(url) {
    console.log('GET: ' + url);
    return function(dispatch, getState) {
      return get(url).then(
        (data) => {
            if(data.ok) {
                let res = data.json()
                return res;
            }
        },
        (error) => { throw error },
      );
    };
  }

  function simplePost(url, dataMap) {
    console.log('POST: ' + url);
    const formData  = new FormData();
    let entries = Object.entries(dataMap);
    entries.forEach(element => {
        formData.append(element[0], element[1]);    
    });
    formData.FCMToken = "FCMToken";

    return function(dispatch, getState) {
      return post(url, formData).then(
        (data) => {
            if(data.ok) {
                let res = data.json()
                return res;
            }
        },
        (error) => { throw error },
      );
    };
  }

  function simplePut(url, dataMap) {
    console.log('PUT: ' + url);
    const formData  = new FormData();
    let entries = Object.entries(dataMap);
    entries.forEach(element => {
        formData.append(element[0], element[1]);    
    });
    formData.FCMToken = "FCMToken";

    return function(dispatch, getState) {
      return put(url, formData).then(
        (data) => {
            if(data.ok) {
                let res = data.json()
                return res;
            }
        },
        (error) => { throw error },
      );
    };
  }

export default {
    setState,
    setStates,
    simpleGet,
    simplePost,
    simplePut,
    login,
    logout,
    Types
};