import { IFbPost } from "../providers/facebook/facebook.interfaces";
import { THUMB_QUALITY } from "../providers/youtube/youtube.provider";
import { getTimestampFromDate } from "./date";

export type VideoProviderType = 'youtube';

export interface ITimetubeVideo extends IFbPost {
	thumbnail: string;
	videoId: string;
	videoUrl: string;
	hashtags?: string[];
}

export const filterFacebookPosts = (videos: IFbPost[]): any => {
	return videos.reduce((acc, item) => {
		if (item.link) {
			const youtubeData = parseVideoURL(item.link);
			if (youtubeData.videoId) {
				const video = enrichVideoItem(item, youtubeData);
				acc.push(video);
			}
		}

		return acc;
	}, [] as ITimetubeVideo[]);
};

const enrichVideoItem = (item: IFbPost, youtubeData: Partial<ITimetubeVideo>) => {
	const enrichedVideo = { ...item, ...youtubeData } as ITimetubeVideo;
	const searchString = (enrichedVideo.message + enrichedVideo.description + enrichedVideo.name).toLowerCase();
	const hashtags = searchString.match(/(?:^|\s)(?:#)\w+/gim);
	enrichedVideo.hashtags = hashtags || [];

	return enrichedVideo;
};

export const youtubeParser = (url: string) => {
	url = decodeURIComponent(url);
	const regExp = /^.*((youtu.be\/)|(youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	if (match && match[8].length === 11) {
		return match[8];
	} else {
		return false;
	}
};

export const parseVideoURL = (url: string): Partial<ITimetubeVideo> => {
	const youtubeId = youtubeParser(url);
	if (youtubeId) {
		return {
			thumbnail: `https://img.youtube.com/vi/${youtubeId}/${THUMB_QUALITY}.jpg`,
			videoId: youtubeId,
			videoUrl: `https://www.youtube.com/embed/${youtubeId}?rel=0`
		};
	}

	return {} as Partial<ITimetubeVideo>;
};

export const sortByDate = (list: any[], key: string) => {
	return list.sort((a, b) => {
		const dateA = getTimestampFromDate(a[key]);
		const dateB = getTimestampFromDate(b[key]);
		return dateB - dateA;
	});
};