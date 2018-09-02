export const getMe = (state) => {
	return state.me;
};

export const getLoggedIn = (state) => {
	return getMe(state).isLoggedIn;
};

export const getAccessToken = (state) => {
	return getMe(state).isLoggedIn;
};