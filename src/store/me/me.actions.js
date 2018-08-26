export const UPDATE_ME = "UPDATE_ME";

export const LOGGED_IN_OUT = "LOGGED_IN_OUT";

export const updateMe = (partialMe) => ({
    type: UPDATE_ME,
    payload: partialMe
});

export const loggedInOut = (flag) => ({
    type: LOGGED_IN_OUT,
    payload: flag
});