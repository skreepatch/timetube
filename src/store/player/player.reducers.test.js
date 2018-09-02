import { initialPlayerState, player } from "./player.reducers";
import { updatePlaying } from "./player.actions";

describe('player reducers', () => {

	it('should return updated player state', () => {
		const videoId = 'videoId';
		const videoId2 = 'videoId2';
		const action = updatePlaying(videoId);
		const action2 = updatePlaying(videoId2);
		expect(player(initialPlayerState, action).playing).toBe(videoId);
		expect(player(initialPlayerState, action2).playing).toBe(videoId2);
	})
});