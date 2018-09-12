import { UserId } from "../../store/id/id.reducers";

export interface IFbPaging {
	next?: string,
	previous?: string,
	cursors?: {
		after?: string,
		before?: string
	}
}

export interface IFbEdge<T> {
	data: T,
	paging: IFbPaging,
	error?: string
}

export interface IFbPicture {
	width: number,
	height: number,
	url: string
}

export interface IFbPost {
	link: string;
	name: string;
	message: string;
	description: string;
	picture: string;
	created_time: string;
	id: UserId
}

export interface IFbUser {
	id: UserId,
	name: string,
	picture: IFbEdge<IFbPicture>,
	accessToken: string,
	link: string
}