import checkValidPassword from "../SignInAsset/CheckValidPassword/CheckValidPassword";

export const isEmail = (email) => {
    return email.trim().length > 0 && email.includes('@');
}
export const isStringValid = (value, lengthValidation) => {
    return value.trim().length > lengthValidation; 
}
export const isPassword = (password) => {
    return checkValidPassword(password);
}
