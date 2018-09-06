import { IAction } from "../state.interfaces";
import { UPDATE_PLAYING } from "./player.actions";

export interface IPlayerState {
	next: string;
	paused: boolean;
	playing: string;
	prev: string;
	ready: boolean;
	volume: number;
}

export const initialPlayerState:IPlayerState = {
	next: "",
	paused: false,
	playing: "",
	prev: "",
	ready: false,
	volume: 100
};

export const player = (state = initialPlayerState, action: IAction): IPlayerState => {
	switch (action.type) {
		case UPDATE_PLAYING:
			return { ...state, playing: action.payload };
		default:
			return state;
	}
};