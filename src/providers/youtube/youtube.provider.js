const IFRAME_API_URL = "https://www.youtube.com/iframe_api";

export const PLAYER_STATUSES = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    VIDEO_CUED: 5
};

export const THUMB_QUALITY = 'hqdefault';

export const getYtApi = () => {
    return window.YT;
};

const initYoutubePlayer = (selector, options) => {
    const config = {...defaultYoutubePlayerConfig, ...options};
    return new window.YT.Player(selector, config);
};
//TODO: Is it important to find the first script and append youtube script to it?
export const loadYouTubeApi = () => {
    const firstScriptTag = document.getElementsByTagName('script')[0];
    const tag = document.createElement('script');
    tag.src = IFRAME_API_URL;

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

export const defaultYoutubePlayerConfig = {
    width: '100%',
    height: '100%',
    videoId: "",
    playerVars: {
        'autoplay': 1,
        'controls': 1,
        'iv_load_policy': 0,
        'showinfo': 0,
        'rel': 0
    },
    events: {
        'onReady': () => {},
        'onStateChange': () => {}
    }
};

export const initializeYoutubeIframeApi = (selector, options) => {
    loadYouTubeApi();
    return new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => resolve(initYoutubePlayer(selector, options));
    });
};