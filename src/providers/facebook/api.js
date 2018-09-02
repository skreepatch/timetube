import { fetchEdge } from './edges';
import { filterFacebookPosts } from '../../utils/video';

export const getVideosFromPosts = (response) => {
	return { ...response, data: filterFacebookPosts(response.data) };
};

export const getYoutubesFromPosts = (id, edge = 'posts', options) => {
	return fetchEdge(id, edge, options)
		.then(getVideosFromPosts);
};

export const getNext = (nextUrl, accessToken) => {
	const url = new URL(nextUrl);
	url.searchParams.set('access_token', accessToken);

	return fetch(`${url.origin}${url.pathname}?${url.searchParams.toString()}`)
		.then((response) => response.json())
		.then(getVideosFromPosts);
};

export const getEdge = (id, edge) => fetchEdge(id, edge);
