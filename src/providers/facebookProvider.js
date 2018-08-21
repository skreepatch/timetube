import {APP_ID} from "../config";
import {STATUSES} from "../utils/fb/login";
import {store} from "../store";
import {loggedInOut, setSelectedTimetube, updateMe} from "../actions";

const statusChange = (response) => {
    if (response.status === STATUSES.CONNECTED) {
        window.FB.api(`${response.authResponse.userID}?fields=name,picture,permissions`, (defaultProfile) => {
            const update = {...defaultProfile, ...response.authResponse};
            store.dispatch(updateMe(update));
            store.dispatch(setSelectedTimetube(update.userID));
            store.dispatch(loggedInOut(true));
        });
    } else {
        store.dispatch(loggedInOut(false));
    }
};

export const initializeFacebookSDK = () => {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.0'
        });

        window.FB.Event.subscribe('auth.statusChange', statusChange);
        window.FB.getLoginStatus(statusChange);
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