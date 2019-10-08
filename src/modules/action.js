// types of action
const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
};

// actions
const login = (user, pass) => ({
    type: Types.LOGIN,
    payload: {user: user, pass: pass}
});

const logout = () => ({
    type: Types.LOGOUT,
    payload: {}
});

export default {
    login,
    logout,
    Types
};