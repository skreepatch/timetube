const IFRAME_API_URL = "https://www.youtube.com/iframe_api";

export const PLAYER_STATUSES = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    VIDEO_CUED: 5
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

export const THUMB_QUALITY = 'hqdefault';

export const getYouTubeApi = () => {
    return window.YT;
};

export const getPlayerConstructor = () => {
    return getYouTubeApi().Player;
};

export const initYouTubePlayer = (selector, options) => {
    const config = {...defaultYoutubePlayerConfig, ...options};
    const player = getPlayerConstructor();
    return new player(selector, config);
};

export const loadYouTubeApi = () => {
    const tag = document.createElement('script');
    tag.src = IFRAME_API_URL;
    document.body.appendChild(tag);
};

export const initializeYouTubeIframeApi = () => {
    return new Promise( (resolve) => {
        window.onYouTubeIframeAPIReady = () => {
            resolve(getYouTubeApi());
        };
        loadYouTubeApi();
    });
};