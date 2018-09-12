import { UserId } from "../../store/id/id.reducers";
import { getTimestampFromDate } from '../../utils/date';
import { IFbEdge, IFbUser } from "./facebook.interfaces";
import { getFbApi } from './facebook.provider';
import { FbEdgeType } from "./facebook.types";
import { FRIENDS_FIELDS, LIKES_FIELDS, POST_FIELDS, REACTIONS_FIELDS } from './fields';

export interface IEdgeOptions {
	since?: number,
	until?: number
}

export const edges = {
	friends: (id: UserId) => {
		return `${id}?fields=friends
          .limit(250){${FRIENDS_FIELDS.join(',')}}`;
	},
	likes: (id: UserId) => {
		return `${id}?fields=likes
          .limit(250){${LIKES_FIELDS.join(',')}}`;
	},
	posts: (id: UserId, options?: IEdgeOptions) => {
		const since = options && options.since ? options.since : 954867754;
		const until = options && options.until ? options.until : getTimestampFromDate();
		return `${id}?fields=posts
          .with(attachment)
          .limit(250){${POST_FIELDS.join(',')}}
          &include_hidden=true
          &since=${since}&until=${until}`;
	},
	reactions: (id: UserId) => {
		return `${id}?fields=reactions
          .limit(250){${REACTIONS_FIELDS.join(',')}}`;
	}
};

export const constructQuery = (id: UserId, edge: string, options?: IEdgeOptions) => {
	return edges[edge](id, options);
};


export const fetchEdge = (id: UserId, edge: FbEdgeType, options?: IEdgeOptions): Promise<Partial<IFbEdge<IFbUser>>> => {
	const graphQuery = constructQuery(id, edge, options);

	return new Promise((resolve, reject) => {
		getFbApi().api(graphQuery, (response: IFbEdge<any>) => {
			if (response.error) {
				reject(response.error);
			} else {
				const entities = response[edge];
				const { data, paging } = entities;

				resolve({ data, paging });
			}
		});
	});
};