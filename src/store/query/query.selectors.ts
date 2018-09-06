import { IRootState } from "../rootReducer";

export const getQuery = (state: Partial<IRootState>) => {
    return state.query;
};

export const getHashtags = (state: Partial<IRootState>) => {
  return getQuery(state).hashtags;
};

export const getSearchterm = (state: Partial<IRootState>) => {
  return getQuery(state).searchTerm;
};