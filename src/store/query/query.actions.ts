import { IQueryState } from "./query.reducers";

export const UPDATE_QUERY = "UPDATE_QUERY";

export const updateQuery = (update: Partial<IQueryState>) => ({
	payload: update,
	type: UPDATE_QUERY
});
