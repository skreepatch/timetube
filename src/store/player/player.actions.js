export const UPDATE_PLAYING = "UPDATE_PLAYING";

export const UPDATE_VOLUME = "UPDATE_VOLUME";

export const updatePlaying = (videoId) => ({
    type: UPDATE_PLAYING,
    payload: videoId
});


export const updateVolume = (volume) => ({
    type: UPDATE_VOLUME,
    payload: volume
});
