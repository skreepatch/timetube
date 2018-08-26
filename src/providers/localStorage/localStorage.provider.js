const keyPrefix = 'tt_';

export const getLocalStorage = () => {
    return window.localStorage;
};

export const updateFromLocalStorage = () => {
    if (!getLocalStorage()) {
        return {};
    }
    const timetubes = Object.keys(getLocalStorage()).reduce( (acc, key) => {
        if (key.indexOf(keyPrefix) === 0) {
            acc[key.replace(keyPrefix, '')] = JSON.parse(getLocalStorage()[key]);
        }
        return acc;
    }, {});

    return timetubes;
};

export const saveToLocalStorage = (key, value) => {
    if (!getLocalStorage()) {
        console.error('Local storage is not available :( ');
    }
    getLocalStorage().setItem(`${keyPrefix}${key}`, JSON.stringify(value));

};
