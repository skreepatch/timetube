const backgroundImages = [
    "6e351e2f",
    // "7c49886e",
    // "7e8b3da1",
    // "9fd4c4e2",
    // "642056b7",
    // "a56fc096",
    // "b50f4f1a",
    // "e3f5d5d9"
];
const randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
export const backgroundImage = `/assets/images/backgrounds/${randomBackground}.png`;