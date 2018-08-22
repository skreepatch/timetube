import {UPDATE_PLAYING, UPDATE_VOLUME} from "../../constants/action-types";

export const updatePlaying = (videoId) => ({
    type: UPDATE_PLAYING,
    payload: videoId
});


export const updateVolume = (volume) => ({
    type: UPDATE_VOLUME,
    payload: volume
});
