export const getFriends = (state: any) => state.friends;

export const getFriendsList = (state: any) => getFriends(state).data;

export const getFriendsFetching = (state: any) => getFriends(state).fetching;

export const getFriendsPaging = (state: any) => getFriends(state).paging;