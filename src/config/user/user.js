import { SERVER_URL_JAVA } from "../base/base";

const getUserById = id => `${SERVER_URL_JAVA}/api/user/id/${id}`;

const getUserByEmail = email => `${SERVER_URL_JAVA}/api/user/get/${email}`;
export {
    getUserById,
    getUserByEmail
}