import { getTime } from '../../utils/date';

import {
    POST_FIELDS,
    FRIENDS_FIELDS,
    LIKES_FIELDS,
    REACTIONS_FIELDS
} from './fields';

export const edges = {
    posts: (id, { since, until }) => {
        return `${id}?fields=posts
          .with(attachment)
          .limit(250){${POST_FIELDS.join(',')}}
          &include_hidden=true
          &since=${since || '954867754'}&until=${until || getTime()}`;
    },
    friends: (id) => {
        return `${id}?fields=friends
          .limit(250){${FRIENDS_FIELDS.join(',')}}`;
    },
    likes: (id) => {
        return `${id}?fields=likes
          .limit(250){${LIKES_FIELDS.join(',')}}`;
    },
    reactions: (id) => {
        return `${id}?fields=reactions
          .limit(250){${REACTIONS_FIELDS.join(',')}}`;
    }
}

export const constructQuery = (id, edge, options = {}) => {
    return edges[edge](id, options);
};


export const fetchEdge = (id, edge, options) => {
    const graphQuery = constructQuery(id, edge, options);
    
    return new Promise((resolve, reject) => {
        window.FB.api(graphQuery, (response) => {
            if (response.error) {
                return reject(response.error);
            }
            const entities = response[edge];
            const { data, paging } = entities;

            return resolve({ data, paging });
        });
    });
};