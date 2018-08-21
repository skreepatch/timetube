import React, { Component } from 'react';
import {APP_ID} from "../config";
import {STATUSES} from "../utils/fb/login";
import {store} from "../store";
import {loggedInOut, setActive, updateMe} from "../actions";


export class FacebookProvider extends Component {

    constructor(props) {
        super(props);

        this.initialize();
    }

    getChildContext() {
        return { fbSdk: window.FB };
    }

    statusChange(response) {
        if (response.status === STATUSES.CONNECTED) {
            window.FB.api(`${response.authResponse.userID}?fields=name,picture,permissions`, (defaultProfile) => {
                const update = {...defaultProfile, ...response.authResponse};
                store.dispatch(updateMe(update));
                store.dispatch(setActive(update.userID));
                store.dispatch(loggedInOut(true));
            });
        } else {
            store.dispatch(loggedInOut(false));
        }
        this.setState({checking: false});
    }

    initialize() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0'
            });

            window.FB.Event.subscribe('auth.statusChange', this.statusChange.bind(this));
            window.FB.getLoginStatus(this.statusChange.bind(this));
        }.bind(this);

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'facebook-jssdk'));

    }

    render() {
        return this.props.children;
    }
}