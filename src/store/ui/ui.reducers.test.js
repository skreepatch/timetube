import { updateUi } from "./ui.actions";
import { ui } from "./ui.reducers";

describe('UI reducer', () => {

	it('should return updated ui state', () => {
		const update = {
			key: 'search',
			value: {
				open: true
			}
		};

		const action = updateUi(update);
		expect(ui({}, action).search.open).toBe(true);
	});
});