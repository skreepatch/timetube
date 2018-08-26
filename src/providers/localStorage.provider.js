const localStorage = window.localStorage;
const keyPrefix = 'tt_';

//TODO: please keep the structure aligned when you have one file in the provider either you put all providers in a folder or you don't. Here youtube is in a folder but local storage isn't
export const updateFromLocalStorage = () => {
    //TODO: if you can, please use a get function since it easier to mock and it will be consistent with the rest of the providers
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
