const localStorage = window.localStorage;

export const updateFromLocalStorage = () => {
    if (!localStorage) {
        return {};
    }
    const timetubes = Object.keys(localStorage).reduce( (acc, key) => {
        if (key.indexOf('tt_') === 0) {
            acc[key.replace('tt_', '')] = JSON.parse(localStorage[key]);
        }
        return acc;
    }, {});

    return timetubes;
};