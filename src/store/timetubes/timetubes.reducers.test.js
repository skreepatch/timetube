import { updateUi } from "../ui/ui.actions";
import { receiveTimetube, requestTimetube } from "./timetubes.actions";
import { timetubes } from "./timetubes.reducers";

describe('timetubes reducer', () => {
	it('should return the same state in case of irrelevant action', () => {
		const action = updateUi({ key: 'search', value: { open: true } });
		const state = {
			timetubes: {}
		};
		expect(timetubes(state, action)).toBe(state);
	});

	it('should set fetching to true when action is REQUEST_TIMETUBE', () => {
		const id = 'id';
		const action = requestTimetube(id);
		const state = {timetubes: {}};
		expect(timetubes(state, action)[ id ].fetching).toBe(true);
	});

	it('should set fetching to false when action is RECEIVE_TIMETUBE', () => {
		const id = 'id';
		const action = receiveTimetube({
			id: id,
			update: {
				data: [],
				paging: {}
			}
		});
		const state = {timetubes: {}};
		expect(timetubes(state, action)[ id ].fetching).toBe(false);
	});
});