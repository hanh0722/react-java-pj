const getTimeTomorrow = () => {
    const today = new Date();
    today.setHours(0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0);

    return tomorrow.getTime();
}

export {
    getTimeTomorrow
}