export const arrayFromObject = (map, iteratorFn) => {
    if (!map || !iteratorFn || !Object.hasOwnProperty(iteratorFn)) {
        return [];
    }
    return Object[iteratorFn](map);
};