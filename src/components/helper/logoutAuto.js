const logoutHandler = () => {
    localStorage.removeItem('token/customer');
    localStorage.removeItem('expiry/customer');
}

const timeOutSignIn = () => {
    const token = localStorage.getItem('token/customer');
    const expiryTime = localStorage.getItem('expiry/customer');
    const timeNow = new Date().getTime();
    if(!token || !expiryTime){
        return;
    }
    const autoLogOutTime = expiryTime - timeNow;
    if(timeNow > expiryTime){
        logoutHandler();
        return;
    }
    setTimeout(() => {
        logoutHandler();
    }, autoLogOutTime)
}

export {
    timeOutSignIn,
    logoutHandler
}