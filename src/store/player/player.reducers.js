import { UPDATE_PLAYING } from "./player.actions";

export const initialPlayerState = {
	playing: "",
	ready: false,
	volume: 100,
	paused: false,
	next: "",
	prev: ""
};

export const player = (state = initialPlayerState, action) => {
	switch (action.type) {
		case UPDATE_PLAYING:
			return { ...state, playing: action.payload };
		default:
			return state;
	}

};