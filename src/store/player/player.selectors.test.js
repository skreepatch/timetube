import { getPlayer, getPlaying } from "./player.selectors";

describe('player selectors', () => {
	describe('getPlayer', () => {
		it('should return the player state', () => {
			const player = 'player';
			expect(getPlayer({player: player})).toBe(player);
		});
	});

	describe('getPlaying', () => {
		it('should return the player.playing state', () => {
			const playing = 'videoId';
			expect(getPlaying({
				player: {
					playing: playing
				}
			})).toBe(playing);
		});
	})
});
