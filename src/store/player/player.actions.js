export const UPDATE_PLAYING = "UPDATE_PLAYING";

export const updatePlaying = (videoId) => ({
    type: UPDATE_PLAYING,
    payload: videoId
});