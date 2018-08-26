import { fetchEdge } from './edges';
import { filterCollection } from '../../utils/video';

const getVideosFromPosts = (response) => {
    return { ...response, data: filterCollection(response.data) };
};

const getYoutubesFromPosts = (id, edge = 'posts', options) => {
    return fetchEdge(id, edge, options)
        .then(getVideosFromPosts);
}

//TODO: can be one liner
const getNext = (nextUrl, accessToken) => {
    const url = new URL(nextUrl);
    url.searchParams.set('access_token', accessToken);

    return fetch(`${url.origin}${url.pathname}?${url.searchParams.toString()}`)
        .then((response) => response.json())
        .then(getVideosFromPosts);
};


//TODO: can be one liner
const getEdge = (id, edge) => {
    return fetchEdge(id, edge);
};


//TODO: why not exposing the api as functions? this means that exerytime that you want a function from this struct you will get them all
export const api = {
    videos: getYoutubesFromPosts,
    edge: getEdge,
    next: getNext
};