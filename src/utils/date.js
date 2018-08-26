export const milliSecondsDivider = 1000;

export const getSecondsFromMilliseconds = (milliseconds) => {
    return milliseconds / milliSecondsDivider;
};

export const getTimestampFromDate = (date) => {
    return parseInt(
        getSecondsFromMilliseconds(
            date ? new Date(date).getTime() : Date.now()
        ), 10);
};