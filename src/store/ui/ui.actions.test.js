import { updateUi } from "./ui.actions";

describe('UI action creators', () => {
	describe('updateUi action creator', () => {
		it('should create updateUi action', () => {
			const key = 'search';
			const value = { open: true };
			const update = { key: key, value: value }
			expect(updateUi(update).payload.key).toBe(key);
			expect(updateUi(update).payload.value).toBe(value);
		});
	});
});