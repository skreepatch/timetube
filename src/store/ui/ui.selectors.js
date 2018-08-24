export const getUI = (state) => {
  return state.ui;
};

export const getLoading = (state) => {
    return getUI(state).loading;
};

export const getError = (state) => {
    return getUI(state).error;
};

export const getFriends = (state) => {
    return getUI(state).friends;
};

export const getFriendsOpen = (state) => {
  return getFriends(state).open;
};


export const getFriendsFetching = (state) => {
    return getFriends(state).fetching;
};

export const getSearch = (state) => {
  return getUI(state).search;
};

export const getSearchOpen = (state) => {
    return getSearch(state).open;
};

export const getPlayer = (state) => {
    return getUI(state).player;
};

export const getPlayerOpen = (state) => {
    return getPlayer(state).open;
};