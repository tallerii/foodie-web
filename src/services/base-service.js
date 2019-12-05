import ls from 'local-storage'

const SERVER_URL = 'https://foodie-g4.herokuapp.com'

export function get(url) {
    const token = ls.get('token');
    var res = fetch(SERVER_URL + url, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        },
    });
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
    return res;
}

export function post(url, body) {
    const token = ls.get('token');
    let payload = {
        method: 'POST',
        body: body,
        headers: {
            Authorization: `Token ${token}`
        }
    };
    return fetch(SERVER_URL + url, payload);
}

export function postWithoutToken(url, body) {
    let payload = {
        method: 'POST',
        body: body
    };
    return fetch(SERVER_URL + url, payload);
}

export function patch(url, body) {
    const token = ls.get('token');
    return fetch(SERVER_URL + url, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${token}`
        },
        body: body
    });
}