const GET = (target, path) => {
    const segments = path.split('.') || [path];
    const [current, ...parts] = segments;
    const value = target[current];

    if (typeof value !== 'undefined') {
        return parts.length ? GET(value, parts.join('.')) : value;
    } else {
        return null;
    }
}

export default GET;