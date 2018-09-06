import { updateMe } from "./me.actions";
import { me } from "./me.reducers";

describe('me reducers', () => {

	describe('me', () => {

		it('should return updated "me" state', () => {
			const myName = 'John Doe';
			const update = {
				name: myName
			};
			const action = updateMe(update);
			const state = {};
			expect(me(state, action)).not.toEqual(state);
			expect(me(state, action).name).toBe(myName);
		});
	});
});