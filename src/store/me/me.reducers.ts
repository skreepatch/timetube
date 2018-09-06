import { IFbUser } from "../../providers/facebook/facebook.interfaces";
import { IAction } from "../state.interfaces";
import { LOGGED_IN_OUT, UPDATE_ME } from "./me.actions";

export interface IMeState extends IFbUser {
	isLoggedIn: boolean;
	error?: string;
}

export const initialState: Partial<IMeState> = {
	isLoggedIn: false
};

export const me = (state = initialState, action: IAction): Partial<IMeState> => {
	switch (action.type) {
		case UPDATE_ME:
			return { ...state, ...action.payload };
		case LOGGED_IN_OUT:
			return { ...state, isLoggedIn: action.payload };
		default:
			return state;
	}
};