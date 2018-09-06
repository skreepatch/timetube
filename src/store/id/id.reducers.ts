import { IAction } from "../state.interfaces";
import { SET_ID } from "./id.actions";

export type UserId = string | number | any;

export const id = (state = "", action: IAction): UserId => {
	switch (action.type) {
		case SET_ID:
			return action.payload;
		default:
			return state;
	}
};