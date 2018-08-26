const THUMB_QUALITY = 'hqdefault';
//TODO: as with all utils, please write them tests since, we want to have the ability to replace utils implementations without breaking anything
//TODO: this is a spesific util for youtube thingis, maybe we should move it to youtube provider
export const filterCollection = (collection) => {
    let filtered = [];
    //TODO: please do not use vars
    var videos = collection;
    return videos.reduce((acc, item) => {
        //TODO: please extract it to a few functions since, it is hard to understand in a glance what the code do
        if (item.link && (item.link.indexOf('youtu') > -1)) {
            const youtubeData = parseVideoURL(item.link);
            if (youtubeData !== null) {
                // TODO: we do not user Object.assign, since you can create an object with destructuring
                const enrichedVideo = Object.assign(item, youtubeData);
                const searchString = (enrichedVideo.message + enrichedVideo.description + enrichedVideo.name).toLowerCase();
                const hashtags = searchString.match(/(?:^|\s)(?:#)\w+/gim);
                enrichedVideo.hashtags = hashtags || [];
                acc.push(enrichedVideo);
            }
        }

        return acc;
    }, filtered);
};
//TODO: lower camel case
export const youtube_parser = (url) => {
    url = decodeURIComponent(url);
    const regExp = /^.*((youtu.be\/)|(youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    //TODO: this is a bit cryptic, please explain it via code refactoring
    if (match && match[8].length === 11) {
        //TODO: the assignment to b is redundant. Either have a meaningful name or remove it all together and just return
        const b = match[8];
        return b;
    } else {
        return false;
    }
};

export const parseVideoURL = (url) => {
    let retVal = {};
    let success = false;

    if (url.match('http(s)?://(www.)?youtube|youtu.be|youtu')) {

        retVal.videoId = youtube_parser(url);

        if (!retVal.videoId) {
            return null;
        }
// TODO: do we have another video provider, or we have actual plans for another video provider. It's debatable
        retVal.provider = "youtube";
        retVal.videoUrl = `https://www.youtube.com/embed/${retVal.videoId}?rel=0`;
        retVal.thumbnail = `https://img.youtube.com/vi/${retVal.videoId}/${THUMB_QUALITY}.jpg`;
        success = true;
    }
//TODO: you do not need the success flag, just return the object and then return null, please see that you do an early return incase that you cannot parse the url
    if (success) {
        return retVal;
    } else {
        return null;
    }
};

//TODO: do you use this function?
export const sortBy = (list, key) => {
    return list.sort((a, b) => {
        //TODO: please extract the 1000 const into a meaningful const for better readability
        const dateA = new Date(a[key]).getTime() / 1000;
        const dateB = new Date(b[key]).getTime() / 1000;
        return dateB - dateA;
    });
};