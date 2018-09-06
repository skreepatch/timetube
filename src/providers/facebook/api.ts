import { UserId } from "../../store/id/id.reducers";
import { filterFacebookPosts } from '../../utils/video';
import { fetchEdge } from './edges';
import { FbEdgeType } from "./facebook.types";

export const getVideosFromPosts = (response: any) => {
	return { ...response, data: filterFacebookPosts(response.data) };
};

export const getYoutubesFromPosts = (id: UserId, edge: FbEdgeType = 'posts', options?: any) => {
	return fetchEdge(id, edge, options)
		.then(getVideosFromPosts);
};

export const getNext = (nextUrl: string, accessToken: string) => {
	const url: URL = new URL(nextUrl);
	url.searchParams.set('access_token', accessToken);

	return fetch(`${url.origin}${url.pathname}?${url.searchParams.toString()}`)
		.then((response) => response.json())
		.then(getVideosFromPosts);
};

export const getEdge = (id: UserId, edge: FbEdgeType) => fetchEdge(id, edge);
