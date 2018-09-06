import { setId } from "./id.actions";
import { id } from "./id.reducers";

describe('id reducers', () => {

	describe('id', () => {
		it('should update the id return new state', () => {
			const newId = 'id';
			const action = setId(newId);
			const state = "";
			expect(id(state, action)).not.toEqual(state);
			expect(id(state, action)).toBe(newId);
		});
	});
});