import { IAction } from "../state.interfaces";
import { UserId } from "./id.reducers";

export const SET_ID = "SET_ID";

export const setId = (id: UserId): IAction => ({
    payload: id,
    type: SET_ID
});