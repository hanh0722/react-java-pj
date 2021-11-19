import { SERVER_URL_JAVA } from "../base/base";

const getUserById = id => `${SERVER_URL_JAVA}/api/user/id/${id}`;

const getUserByEmail = email => `${SERVER_URL_JAVA}/api/user/get/${email}`;

const changeInformationOfUser = `${SERVER_URL_JAVA}/api/user/update`;

const updatePasswordUser = `${SERVER_URL_JAVA}/api/user/reset/password`;
export {
    getUserById,
    getUserByEmail,
    changeInformationOfUser,
    updatePasswordUser
}