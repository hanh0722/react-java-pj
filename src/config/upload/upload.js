import { SERVER_URL_JAVA, SERVER_URL_NODEJS } from "../base/base";

const uploadSingleImageApi = `${SERVER_URL_NODEJS}/api/upload/single`;
const uploadMultipleImageApi = `${SERVER_URL_NODEJS}/api/upload/multiple`;

export {
    uploadMultipleImageApi,
    uploadSingleImageApi
}