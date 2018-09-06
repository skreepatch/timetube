import { SET_ID, setId } from "./id.actions";
import { UserId } from "./id.reducers";

describe('id actions', () => {

	describe('setId', () => {
		it('should create the setId action', () => {
			const id: UserId = 'id';
			expect(setId(id).type).toBe(SET_ID);
			expect(setId(id).payload).toBe(id);
		});
	});
});