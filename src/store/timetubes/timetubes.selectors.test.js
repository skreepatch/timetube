import { getMyTimetube, getSelected, getTimetubes } from "./timetubes.selectors";

describe('timetube selectors', () => {
	describe('getTimetubes selector', () => {
		it('should return timetubes store section from state', () => {
			const timetubes = 'Hey';
			const state = { timetubes: timetubes };
			expect(getTimetubes(state)).toBe(timetubes);
		});
	});
	describe('getSelected', () => {
		it('should return the selected timetube by key from timetubes store section', () => {
			const selected = 'Yo';
			const selectedId = 'theId';
			const state = {
				id: selectedId,
				timetubes: {
					[ selectedId ]: selected
				}
			};
			expect(getSelected(state)).toBe(selected);
		});
	});

	describe('getMyTimetube', () => {
		it('should return the timetube of the currently logged in use', () => {
			const selected = 'Yo';
			const selectedId = 'theId';
			const me = {
				id: 'me'
			};
			const state = {
				id: selectedId,
				me: me,
				timetubes: {
					[ me.id ]: selected
				}
			};
			expect(getMyTimetube(state)).toBe(selected);
		});
	});


	describe('getSelectedTimetubePaging', () => {
		it('should return the paging object of the selected timetube by key from timetubes store section', () => {
			const selected = { paging: {} };
			const selectedId = 'myId';
			const state = {
				id: selectedId,
				timetubes: {
					[ selectedId ]: selected
				}
			};
			expect(getSelected(state).paging).toBe(selected.paging);
		});
	});

	describe('getSelectedTimetubeVideos', () => {
		it('should return the videos object of the selected timetube by key from timetubes store section', () => {
			const selected = { videos: {} };
			const selectedId = 'myId';
			const state = {
				id: selectedId,
				timetubes: {
					[ selectedId ]: selected
				}
			};
			expect(getSelected(state).videos).toBe(selected.videos);
		});
	})
});