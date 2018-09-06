import { loggedInOut, updateMe } from "./me.actions";

describe('me actions', () => {

	describe('updateMe', () => {

		it('should create updateMe action', () => {
			const me = {name: "me"};
			expect(updateMe(me).payload).toBe(me);
		});
	});

	describe('loggedInOut', () => {

		it('should create loggedInOut action', () => {
			const isLoggedIn = false;
			expect(loggedInOut(isLoggedIn).payload).toBe(isLoggedIn);
		});
	})
});