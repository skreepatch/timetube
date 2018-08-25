import {APP_ID} from "../../config";

import {store} from "../../store/index";
import { updateMe, loggedInOut } from "../../store/me/me.actions";
import {AUTH_STATUSES} from "../../constants/statuses";

const statusChange = (response) => {
    if (response.status === AUTH_STATUSES.CONNECTED) {
        fetchUser(response.authResponse);
    } else {
        store.dispatch(loggedInOut(false));
    }
};

export const fetchUser = (authResponse) => {
    window.FB.api(`${authResponse.userID}?fields=name,picture,permissions`, (defaultProfile) => {
        const update = {...defaultProfile, ...authResponse};
        store.dispatch(updateMe(update));
        store.dispatch(loggedInOut(true));
    });
};

export const initializeFacebookSDK = (statusChangeCallback = statusChange) => {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.0'
        });

        window.FB.Event.subscribe('auth.statusChange', statusChangeCallback);
        window.FB.getLoginStatus(statusChangeCallback);
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

export const fbSdk = () => {
    return window.FB;
};

export const FBLogin = () => {
  return fbSdk().login;
};