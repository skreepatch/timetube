import { IFbUser } from "../../providers/facebook/facebook.interfaces";
import { IAction } from "../state.interfaces";

export const UPDATE_ME = "UPDATE_ME";

export const LOGGED_IN_OUT = "LOGGED_IN_OUT";

export const updateMe = (partialMe: Partial<IFbUser>): IAction => ({
    payload: partialMe,
    type: UPDATE_ME
});

export const loggedInOut = (flag: boolean): IAction => ({
    payload: flag,
    type: LOGGED_IN_OUT
});