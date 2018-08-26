import {LOGGED_IN_OUT, UPDATE_ME} from "../../constants/action-types";
export const updateMe = (partialMe) => ({
    type: UPDATE_ME,
    payload: partialMe
});

export const loggedInOut = (flag) => ({
    type: LOGGED_IN_OUT,
    payload: flag
});