import { fetchEdge } from '../providers/facebook/edges';
import { filterCollection } from './video';

const getVideosFromPosts = (response) => {
    return { ...response, data: filterCollection(response.data) };
};

const getYoutubesFromPosts = (id, edge = 'posts', options) => {
    return fetchEdge(id, edge, options)
        .then(getVideosFromPosts);
}

const getNext = (nextUrl, accessToken) => {
    const url = new URL(nextUrl);
    url.searchParams.set('access_token', accessToken);

    return fetch(`${url.origin}${url.pathname}?${url.searchParams.toString()}`)
        .then((response) => response.json())
        .then(getVideosFromPosts);
}

const getEdge = (id, edge) => {
    return fetchEdge(id, edge);
}

export const api = {
    videos: getYoutubesFromPosts,
    edge: getEdge,
    next: getNext
};