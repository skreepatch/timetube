const keyPrefix = 'tt_';

export const getLocalStorage = () => {
	return window.localStorage;
};

export const updateFromLocalStorage = () => {
	if (getLocalStorage()) {
		return Object.keys(getLocalStorage()).reduce((acc, key) => {
			if (key.indexOf(keyPrefix) === 0) {
				acc[key.replace(keyPrefix, '')] = JSON.parse(getLocalStorage()[key]);
			}
			return acc;
		}, {});
	}

	return {};
};

export const saveToLocalStorage = (key: string, value: string): void => {
	if (getLocalStorage()) {
		getLocalStorage().setItem(`${keyPrefix}${key}`, JSON.stringify(value));
	}
};
