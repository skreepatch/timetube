import { getHashtags, getQuery, getSearchterm } from "./query.selectors";

describe('query selectors', () => {

	describe('getQuery', () => {

		it('should return the query state segment', () => {
			const query = 'query';
			const state = {
				query
			};
			expect(getQuery(state)).toBe(query);
		});
	});

	describe('getHashtags', () => {

		it('should return hashtags from the query segment', () => {
			const query = {
				hashtags: [ '#hash', '#tags' ]
			};
			const state = {
				query
			};
			expect(getHashtags(state)).toEqual(query.hashtags);
		});
	});

	describe('getSearchterm', () => {

		it('should return searchterm from the query segment', () => {
			const query = {
				searchTerm: 'dogs'
			};
			const state = {
				query
			};
			expect(getSearchterm(state)).toEqual(query.searchTerm);
		});
	});
});