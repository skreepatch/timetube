import {
	getError,
	getFriendsUi,
	getFriendsFetching,
	getFriendsOpen,
	getLoading, getPlayer, getPlayerOpen, getPlayerReady,
	getSearch,
	getSearchOpen,
	getUI
} from "./ui.selectors";

describe('UI selectors', () => {

	describe('getUI', () => {

		it('should return ui state', () => {
			expect(getUI({ui: 'ui'})).toBe('ui');
		});
	});

	describe('getLoading', () => {

		it('should return ui.loading state', () => {
			expect(getLoading({
				ui: {
				loading: true
				}
			})).toBe(true);
		});
	});

	describe('getError', () => {

		it('should return ui.error state', () => {
			const errorMessage = 'something went wrong';
			expect(getError({
				ui: {
					error: errorMessage
				}
			})).toBe(errorMessage);
		});
	});

	describe('getFriendsUi', () => {

		it('should return ui.friends state', () => {
			expect(getFriendsUi({
				ui: {
					friends: 'friends'
				}
			})).toBe('friends');
		});
	});

	describe('getFriendsOpen', () => {

		it('should return ui.friends.open state', () => {
			expect(getFriendsOpen({
				ui: {
					friends: {
						open: true
					}
				}
			})).toBe(true);
		});
	});

	describe('getSearch', () => {

		it('should return ui.search state', () => {
			expect(getSearch({
				ui: {
					search: 'search'
				}
			})).toBe('search');
		});
	});

	describe('getSearchOpen', () => {

		it('should return ui.search.open state', () => {
			expect(getSearchOpen({
				ui: {
					search: {
						open: true
					}
				}
			})).toBe(true);
		});
	});

	describe('getPlayer', () => {

		it('should return ui.player state', () => {
			expect(getPlayer({
				ui: {
					player: 'player'
				}
			})).toBe('player');
		});
	});

	describe('getPlayerOpen', () => {

		it('should return ui.player.open state', () => {
			expect(getPlayerOpen({
				ui: {
					player: {
						open: true
					}
				}
			})).toBe(true);
		});
	});

	describe('getPlayerReady', () => {

		it('should return ui.player.ready state', () => {
			expect(getPlayerReady({
				ui: {
					player: {
						ready: true
					}
				}
			})).toBe(true);
		});
	});
});