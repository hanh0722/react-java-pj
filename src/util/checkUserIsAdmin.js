const checkUserIsAdmin = (arrayRole) => {
    arrayRole.forEach(role => {
        console.log(role);
        if(role.toString() === 'ROLE_ADMIN'.toString()){
            return true;
        }
    })
    return false;
}

export default checkUserIsAdmin;