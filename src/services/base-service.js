import ls from 'local-storage'
// import { connect } from "react-redux";
// import ACTIONS from "../modules/action";

const SERVER_URL = 'https://foodie-g4.herokuapp.com'

export function get(url) {
    // const token = ls.get('token');
    console.log('GET: ' + url);
    const token = 'dfc096ae6dfb111157a4f638807ad5b16189b137';
    var res = fetch(SERVER_URL + url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Token ${token}`
        },
        async: true
    });
    // res.then(res => res.json());
    // res.then(result => console.log("result " + JSON.stringify(result)|));
    // res.catch(err => {
    //     ls.remove("token");
    //     ls.set('isLogged', false);
    // })
    return res;
}

export function getById(url, id) {
    const token = ls.get('token');
    var res = fetch(SERVER_URL + url + '?id=' + id, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
        }
    });
    // res.then(res => res.json());
    // res.then(result => console.log(result));
    // res.catch(err => {
    //     ls.remove("token");
    //     ls.set('isLogged', false);
    // })
    return res;
}

export function post(url, body) {
    return fetch(SERVER_URL + url, {
        method: 'POST',
        body: body
    });
}