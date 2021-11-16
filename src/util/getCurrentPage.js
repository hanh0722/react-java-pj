const getCurrentPage = (location) => {
    const searchParams = new URLSearchParams(location);
    let page = searchParams.get('page');
    return +page || 1;
}

export default getCurrentPage;