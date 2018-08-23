import {updateQuery} from "./query.actions";
import {query} from "./query.reducers";
import {UPDATE_QUERY} from "../../constants/action-types";

describe('query actions', () => {
    describe('updateQuery', () => {
        it('should create updateQuery action', () => {
            const query = 'some query';
            expect(updateQuery(query).type).toBe(UPDATE_QUERY);
            expect(updateQuery(query).payload).toBe(query);
        });
    });
});