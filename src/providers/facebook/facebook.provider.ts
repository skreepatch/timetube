import { store } from "../../store/index";
import { loggedInOut, updateMe } from "../../store/me/me.actions";
import { updateUi } from "../../store/ui/ui.actions";
import { secondsToMilliseconds } from "../../utils/date";
import { AUTH_STATUSES } from "./facebook.constants";
import { IFbUser } from "./facebook.interfaces";
import { DEV_APP_ID } from "./facebookAppId";
import Timer = NodeJS.Timer;

const statusChange = (response: any) => {
	if (response.status === AUTH_STATUSES.CONNECTED) {
		fetchUser(response.authResponse);
	} else {
		store.dispatch(loggedInOut(false));
	}
	store.dispatch(
		updateUi({
			key: 'loading',
			value: false
		})
	);
};

let updateAccessTokenTimer: Timer;

export const updateAccessToken = (expiresIn: number) => {
	if (updateAccessTokenTimer) {
		clearTimeout(updateAccessTokenTimer);
	}
	updateAccessTokenTimer = setTimeout( () => {
		getFbApi().getLoginStatus((response: any) => {
			updateAccessToken(response.authResponse.expiresIn)
		});
	}, secondsToMilliseconds(expiresIn));
};

export const fetchUser = (authResponse: any) => {
	getFbApi().api(`${authResponse.userID}?fields=name,picture,permissions`, (defaultProfile: IFbUser) => {
		const update = { ...defaultProfile, ...authResponse };
		store.dispatch(updateMe(update));
		store.dispatch(loggedInOut(true));
		updateAccessToken(authResponse.expiresIn)
	});
};

export const initializeFacebookApi = (statusChangeCallback = statusChange) => {
	return new Promise((resolve) => {
		(window as any).fbAsyncInit = (): void => {
			getFbApi().init({
				appId: DEV_APP_ID,
				autoLogAppEvents: true,
				version: 'v3.0',
				xfbml: true
			});

			getFbApi().Event.subscribe('auth.statusChange', statusChangeCallback);
			getFbApi().getLoginStatus(statusChangeCallback);
			resolve(getFbApi());
		};
		((d, s, id) => {
			let js: HTMLScriptElement;
			const fjs: Element = d.getElementsByTagName(s)[ 0 ];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s) as HTMLScriptElement;
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			if (fjs && fjs.parentNode !== null) {
				fjs.parentNode.insertBefore(js, fjs);
			}
		})(document, 'script', 'facebook-jssdk');
	});
};

export const getFbApi = () => {
	return (window as any).FB;
};

export const fbLogin = () => {
	return getFbApi().login(statusChange, {
		scope: 'public_profile,user_posts,user_friends'
	});
};