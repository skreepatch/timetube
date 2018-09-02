export const getFriends = (state) => state.friends;

export const getFriendsList = (state) => getFriends(state).data;

export const getFriendsFetching = (state) => getFriends(state).fetching;

export const getFriendsPaging = (state) => getFriends(state).paging;