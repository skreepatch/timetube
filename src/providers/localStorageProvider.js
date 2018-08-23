const localStorage = window.localStorage;
const keyPrefix = 'tt_';


export const updateFromLocalStorage = () => {
    if (!localStorage) {
        return {};
    }
    const timetubes = Object.keys(localStorage).reduce( (acc, key) => {
        if (key.indexOf(keyPrefix) === 0) {
            acc[key.replace(keyPrefix, '')] = JSON.parse(localStorage[key]);
        }
        return acc;
    }, {});

    return timetubes;
};

export const saveToLocalStorage = (key, value) => {
    if (!localStorage) {
        console.error('Local storage is not available :( ');
    }
    localStorage.setItem(`${keyPrefix}${key}`, JSON.stringify(value));

};
