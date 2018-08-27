import { getId } from "./id.selectors";

describe('id selectors', () => {
	describe('getId', () => {
		it('should return the id from the state', () => {
			const id = 'id';
			const state = { id };
			expect(getId(state)).toBe(id);
		});
	});
});