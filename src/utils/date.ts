export const milliSecondsDivider: number = 1000;

export const millisecondsToSeconds = (milliseconds: number): (number | string) => {
	return milliseconds / milliSecondsDivider;
};


export const secondsToMilliseconds = (seconds: number) => {
	return seconds * milliSecondsDivider;
};

export const getTimestampFromDate = (date?: Date): number => {
	return parseInt(
		millisecondsToSeconds(
			date ? new Date(date).getTime() : Date.now()
		) as string, 10);
};