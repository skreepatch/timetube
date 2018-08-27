import { updatePlaying } from "./player.actions";

describe('player action creators', () => {
	describe('updatePlaying', () => {
		it('should create updatePlaying action', () => {
			const videoId = 'videoId';
			expect(updatePlaying(videoId).payload).toBe(videoId);
		});
	});
});