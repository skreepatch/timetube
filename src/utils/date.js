export const getTime = (date) => {
    const milliseconds = date ? new Date(date).getTime() : Date.now();

    return parseInt(milliseconds / 1000, 10);
}