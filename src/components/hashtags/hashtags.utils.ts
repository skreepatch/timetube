// import { ITimetubeVideo } from "../../utils/video";
//
// export const createHashTagsCollection = (
// 	collection: ITimetubeVideo[],
// 	searchInFields: string[]
// ) => {
// 	return collection
// 		.reduce( (tags: {}, video: ITimetubeVideo) => {
// 			const searchIn = searchInFields.reduce(
// 				(acc, video) => {
// 					video.message + video.description + video.name;
// 				}
// 			const videoTags = searchIn.match(/(?:^|\s)(?:#)\w+/gim);
// 			if (videoTags) {
// 				videoTags.forEach((tag) => {
// 					const key = tag.toLowerCase().trim();
// 					if (tags[key]) {
// 						tags[key]++;
// 					} else {
// 						tags[key] = 1;
// 					}
// 				});
// 			}
//
// 			return tags;
// 		}, {});
// };