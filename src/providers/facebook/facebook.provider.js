import {store} from "../../store/index";
import { updateMe, loggedInOut } from "../../store/me/me.actions";
import {AUTH_STATUSES} from "./facebook.constants";
import {APP_ID} from "../../config/facebookAppId";
import {updateUi} from "../../store/ui/ui.actions";

const statusChange = (response) => {
    if (response.status === AUTH_STATUSES.CONNECTED) {
        fetchUser(response.authResponse);
    } else {
        store.dispatch(loggedInOut(false));
    }
    store.dispatch(updateUi({key: 'loading', value: false}));
};

export const fetchUser = (authResponse) => {
    getFbSdk().api(`${authResponse.userID}?fields=name,picture,permissions`, (defaultProfile) => {
        const update = {...defaultProfile, ...authResponse};
        store.dispatch(updateMe(update));
        store.dispatch(loggedInOut(true));
    });
};

export const initializeFacebookSDK = (statusChangeCallback = statusChange) => {
    window.fbAsyncInit = function () {
        getFbSdk().init({
            appId: APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.0'
        });

        getFbSdk().Event.subscribe('auth.statusChange', statusChangeCallback);
        getFbSdk().getLoginStatus(statusChangeCallback);
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (fjs) {
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'facebook-jssdk'));
};

export const getFbSdk = () => {
    return window.FB;
};

export const fbLogin = () => {
  return getFbSdk().login;
};