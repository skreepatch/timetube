const IFRAME_API_URL = "https://www.youtube.com/iframe_api";

const initYoutubePlayer = (selector, options) => {
    const config = {...defaultYoutubePlayerConfig, ...options};
    return new window.YT.Player(selector, config);
};

export const loadTYApi = () => {
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
        'modestbranding': 1,
        'rel': 0
    },
    events: {
        'onReady': () => {},
        'onStateChange': () => {}
    }
};

export const initializeYoutubeIframeApi = (selector, options) => {
    loadTYApi();
    return new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
            return resolve(initYoutubePlayer(selector, options));
        };
    });
};