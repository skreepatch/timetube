export const me = (state) => {
    return state.me;
};

export const loggedIn = (state) => {
    return me(state).isLoggedIn;
};