import { UserId } from "./id.reducers";
import { getId } from "./id.selectors";

describe('id selectors', () => {

	describe('getId', () => {

		it('should return the id from the state', () => {
			const id: UserId = 'id';
			const state = { id };
			expect(getId(state)).toBe(id);
		});
	});
});