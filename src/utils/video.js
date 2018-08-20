const THUMB_QUALITY = 'hqdefault';

export const filterCollection = (collection) => {
    let filtered = [];
    var videos = collection;
    return videos.reduce((acc, item) => {
        if (item.link && (item.link.indexOf('youtu') > -1)) {
            const youtubeData = parseVideoURL(item.link);
            if (youtubeData !== null) {
                const enrichedVideo = Object.assign(item, youtubeData);
                const searchString = (enrichedVideo.message + enrichedVideo.description + enrichedVideo.name).toLowerCase();
                const hashtags = searchString.match(/(?:^|\s)(?:#)\w+/gim);
                enrichedVideo.hashtags = hashtags || [];
                acc.push(enrichedVideo);
            }
        }

        return acc;
    }, filtered);
}
export const youtube_parser = (url) => {
    url = decodeURIComponent(url);
    const regExp = /^.*((youtu.be\/)|(youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[8].length === 11) {
        const b = match[8];
        return b;
    } else {
        return false;
    }
}

export const parseVideoURL = (url) => {
    let retVal = {};
    let success = false;

    if (url.match('http(s)?://(www.)?youtube|youtu.be|youtu')) {

        retVal.videoId = youtube_parser(url);

        if (!retVal.videoId) {
            return null;
        }

        retVal.provider = "youtube";
        retVal.videoUrl = `https://www.youtube.com/embed/${retVal.videoId}?rel=0`;
        retVal.thumbnail = `https://img.youtube.com/vi/${retVal.videoId}/${THUMB_QUALITY}.jpg`;
        success = true;
    }

    if (success) {
        return retVal;
    } else {
        return null;
    }
}

export const sortBy = (list, key) => {
    return list.sort((a, b) => {
        const dateA = new Date(a[key]).getTime() / 1000;
        const dateB = new Date(b[key]).getTime() / 1000;
        return dateB - dateA;
    });
}