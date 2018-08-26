//TODO: you've constructed an enum for the statuses, but why not use the simpler string consts that will help us debug. Enums are very helpful when they are serializable and can be used when debugging. In JavaScript when debugging they will be numbers which is a shame.
export const PLAYER_STATUSES = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    //TODO: typo
    VIDEO_CUED: 5
};

export const AUTH_STATUSES = {
    CONNECTED: 'connected',
    //TODO: you can use spaces :)
    NOT_AUTHORIZED: 'not_authorized',
    UNKNOWN: 'unknown'
};