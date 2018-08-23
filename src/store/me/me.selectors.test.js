import {getLoggedIn, getMe} from "./me.selectors";

describe('me selectors', () => {
    describe('getMe', () => {
        it('should return me from the state', () => {
            const me = 'me';
            const state = {me: me};
            expect(getMe(state)).toBe(me);
        });
    });

    describe('getLoggedIn', () => {
        it('should return isLoggedIn from me section of the state', () => {
            const state = {me: {isLoggedIn: true}};
            expect(getLoggedIn(state)).toBe(true);
        })
    });
});