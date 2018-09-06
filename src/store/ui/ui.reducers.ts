import { IAction } from "../state.interfaces";
import { UPDATE_UI } from "./ui.actions";

export interface IUiProperty {[key: string]: boolean};

export interface IUiState {
	error: string;
	friends: IUiProperty,
	loading: boolean,
	player: IUiProperty,
	search: IUiProperty
}

const initialState: IUiState = {
	error: "",
	friends: {
		open: false
	},
	loading: true,
	player: {
		open: false,
		ready: false
	},
	search: {
		open: false,
	}
};

export const ui = (state = initialState, action: IAction): IUiState => {
	switch (action.type) {
		case UPDATE_UI:
			return {
				...state,
				[action.payload.key]: action.payload.value
			};
		default:
			return state;

	}
};