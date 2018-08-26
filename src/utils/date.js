export const getTime = (date) => {
    const milliseconds = date ? new Date(date).getTime() : Date.now();

    //TODO: think about extracting 1000 to a const to have better readability
    return parseInt(milliseconds / 1000, 10);
}