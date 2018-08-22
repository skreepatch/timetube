export const ui = (state) => {
  return state.ui;
};

export const loading = (state) => {
    return ui(state).loading;
};

export const error = (state) => {
    return ui(state).error;
};

export const friends = (state) => {
    return ui(state).friends;
};

export const friendsOpen = (state) => {
  return friends(state).open;
};


export const friendsFetching = (state) => {
    return friends(state).fetching;
};

export const search = (state) => {
  return state.search;
};

export const searchOpen = (state) => {
    return search(state).open;
};