const randomElements = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return {
        randomNumber: random,
        valueRandom: array[random]
    }
}

export {
    randomElements
}