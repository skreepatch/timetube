export const getMe = (state: any) => state.me;

export const getLoggedIn = (state: any) => getMe(state).isLoggedIn;

export const getAccessToken = (state: any) => getMe(state).accessToken;