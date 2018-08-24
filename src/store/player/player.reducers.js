import { UPDATE_PLAYING, UPDATE_VOLUME } from "../../constants/action-types";

export const player = (state = {
    playing: "",
    ready: false,
    volume: 100,
    paused: false,
    next: "",
    prev: ""
}, action) => {
    switch (action.type) {
        case UPDATE_PLAYING:
            return { ...state, playing: action.payload };
        case UPDATE_VOLUME:
            return { ...state, volume: action.payload };
        default:
            return state;
    }

};