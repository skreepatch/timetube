import { UPDATE_QUERY, updateQuery } from "./query.actions";

describe('query actions', () => {

	describe('updateQuery', () => {

		it('should create updateQuery action', () => {
			const query = {searchTerm: "search"};
			expect(updateQuery(query).type).toBe(UPDATE_QUERY);
			expect(updateQuery(query).payload).toBe(query);
		});
	});
});