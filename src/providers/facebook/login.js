export const STATUSES = {
    CONNECTED: 'connected',
    NOT_AUTHORIZED: 'not_authorized',
    UNKNOWN: 'unknown'
}

const FBLogin = (statusChangeCallback) => {
    window.FB.getLoginStatus((response) => {
        if (response.status === STATUSES.CONNECTED) {
            statusChangeCallback(response.authResponse);
        } else {
            window.FB.login(statusChangeCallback, { scope: 'user_posts,user_friends,user_likes' });
        }
    });
}

export default FBLogin;