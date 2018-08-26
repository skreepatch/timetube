import {getTimestampFromDate} from "./date";
import {THUMB_QUALITY} from "../providers/youtube/youtube.provider";

//TODO: as with all utils, please write them tests since, we want to have the ability to replace utils implementations without breaking anything
//TODO: this is a spesific util for youtube thingis, maybe we should move it to youtube provider
export const filterFacebookPosts = (videos) => {
    return videos.reduce((acc, item) => {
        if (item.link) {
            const youtubeData = parseVideoURL(item.link);
            if (youtubeData !== null) {
                acc.push(enrichVideoItem(item, youtubeData));
            }
        }

        return acc;
    }, []);
};

const enrichVideoItem = (item, youtubeData) => {
    const enrichedVideo = {...item, ...youtubeData};
    const searchString = (enrichedVideo.message + enrichedVideo.description + enrichedVideo.name).toLowerCase();
    const hashtags = searchString.match(/(?:^|\s)(?:#)\w+/gim);
    enrichedVideo.hashtags = hashtags || [];
    return enrichedVideo;
};

export const youtubeParser = (url) => {
    url = decodeURIComponent(url);
    const regExp = /^.*((youtu.be\/)|(youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    //TODO: this is a bit cryptic, please explain it via code refactoring
    if (match && match[8].length === 11) {
        return match[8];
    } else {
        return false;
    }
};

export const parseVideoURL = (url) => {
    const youtubeId = youtubeParser(url);
    if (!youtubeId) {
        return null;
    }


// TODO: do we have another video provider, or we have actual plans for another video provider. It's debatable
    return {
        videoId: youtubeId,
        provider: "youtube",
        videoUrl: `https://www.youtube.com/embed/${youtubeId}?rel=0`,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/${THUMB_QUALITY}.jpg`
    };
};

export const sortByKey = (list, key) => {
    return list.sort((a, b) => {
        const dateA = getTimestampFromDate(a[key]);
        const dateB = getTimestampFromDate(b[key]);
        return dateB - dateA;
    });
};