export const getQuery = (state) => {
    return state.query;
};

export const getHashtags = (state) => {
  return getQuery(state).hashtags;
};

export const getSearchterm = (state) => {
  return getQuery(state).searchTerm;
};