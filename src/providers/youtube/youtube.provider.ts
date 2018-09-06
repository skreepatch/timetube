const IFRAME_API_URL = "https://www.youtube.com/iframe_api";

export type PlayerSelectorType = HTMLElement | HTMLDivElement | string;

export const PLAYER_STATUSES = {
	BUFFERING: 3,
	ENDED: 0,
	PAUSED: 2,
	PLAYING: 1,
	UNSTARTED: -1,
	VIDEO_CUED: 5

};

export const defaultYoutubePlayerConfig = {
	height: '100%',
	playerVars: {
		'autoplay': 1,
		'controls': 1,
		'iv_load_policy': 0,
		'rel': 0,
		'showinfo': 0
	},
	videoId: "",
	width: '100%'
};

export const THUMB_QUALITY = 'hqdefault';

export const getYouTubeApi = () => {
	return (window as any).YT;
};

export const getPlayerConstructor = () => {
	return getYouTubeApi().Player;
};

export const initYouTubePlayer = (selector: PlayerSelectorType, options: any) => {
	const config = { ...defaultYoutubePlayerConfig, ...options };
	const player = getPlayerConstructor();
	return new player(selector, config);
};

export const loadYouTubeApi = () => {
	const tag = document.createElement('script');
	tag.src = IFRAME_API_URL;
	document.body.appendChild(tag);
};

export const initializeYouTubeIframeApi = () => {
	return new Promise((resolve) => {
		(window as any).onYouTubeIframeAPIReady = () => {
			resolve(getYouTubeApi());
		};
		loadYouTubeApi();
	});
};