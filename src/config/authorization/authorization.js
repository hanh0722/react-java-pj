import { SERVER_URL_JAVA, SERVER_URL_NODEJS } from "../base/base";

const registerApi = `${SERVER_URL_JAVA}/api/user/register`;
const sendMailAfterRegister  = `${SERVER_URL_NODEJS}/api/auth/validate/`;
const checkUserIsValidate = token => `${SERVER_URL_JAVA}/api/user/verify?token=${token}`;
const checkOTPOfUser = `${SERVER_URL_JAVA}/api/user/validate`;
const loginApi = `${SERVER_URL_JAVA}/api/login`;
export {
    registerApi,
    sendMailAfterRegister,
    checkUserIsValidate,
    checkOTPOfUser,
    loginApi
}