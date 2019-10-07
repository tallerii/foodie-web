
// types of action
const Types = {
    LOGIN: "LOGIN",
};

// actions
const login = (user, pass) => ({
    type: Types.LOGIN,
    payload: {user: user, pass: pass}
});

export default {
    login,
    Types
};