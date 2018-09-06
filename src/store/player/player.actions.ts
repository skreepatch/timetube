export const UPDATE_PLAYING = "UPDATE_PLAYING";

export const updatePlaying = (videoId: string) => ({
	payload: videoId,
	type: UPDATE_PLAYING
});