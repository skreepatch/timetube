//TODO: you have some consts that you do not user, please remove
//TODO: This consts are for actions. We do not need to have a centralized place for them. you can expose them in the actions them self. this way you do not need to edit this file every time you want to add an action.
//TODO: in an action const we can write a human readable explanation what the action is, e.g. for update me '[me] update user info'. As it will help us debug and understand a user journey
export const UPDATE_ME = "UPDATE_ME";
export const UPDATE_FRIENDS = "UPDATE_FRIENDS";
export const ADD_TIMETUBE = "ADD_TIMETUBE";
export const RECEIVE_TIMETUBE = "RECEIVE_TIMETUBE";
export const LOGGED_IN_OUT = "LOGGED_IN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ID = "SET_ID";
export const SET_ERROR = "SET_ERROR";
export const UPDATE_QUERY = "UPDATE_QUERY";
export const UPDATE_PLAYING = "UPDATE_PLAYING";
export const UPDATE_VOLUME = "UPDATE_VOLUME";
export const UPDATE_UI = "UPDATE_UI";
export const REQUEST_TIMETUBE = "REQUEST_TIMETUBE";