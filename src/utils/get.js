//TODO: I do not understand what this functions is about. please use lower camel case
export const GET = (target, path) => {
    //TODO: this is an underlying assumption that we delimit the path with dots, why not sending it as an array. you can see that you split the dots and then join them when you construct an inner call to itself
    const segments = path.split('.') || [path];
    const [current, ...parts] = segments;
    const value = target[current];

    if (typeof value !== 'undefined') {
        return parts.length ? GET(value, parts.join('.')) : value;
    } else {
        return null;
    }
};