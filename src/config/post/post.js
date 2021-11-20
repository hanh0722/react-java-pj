import { SERVER_URL_JAVA, SERVER_URL_NODEJS } from "../base/base";

const uploadProductApi = `${SERVER_URL_JAVA}/api/product/create`;

const createPostApi = `${SERVER_URL_JAVA}/api/blog/create`;

const getBlogByPage = `${SERVER_URL_NODEJS}/api/blog/get`;

const getBlogById = id => `${SERVER_URL_JAVA}/api/blog/get/${id}`;
export {
    uploadProductApi,
    createPostApi,
    getBlogByPage,
    getBlogById
}