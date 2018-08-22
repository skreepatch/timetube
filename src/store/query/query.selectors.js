export const query = (state) => {
    return state.query;
};

export const hashtags = (state) => {
  return query(state).hashtags;
};

export const searchterm = (state) => {
  return query(state).searchTerm;
};