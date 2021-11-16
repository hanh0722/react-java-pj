import { serverUrl } from "./url";

const URL_CONFIG = `${serverUrl}/api/post`;

const createPostApi = `${URL_CONFIG}/create`;

const getAllPostsApi = `${URL_CONFIG}/blogs`;

const getBlogById = id => `${URL_CONFIG}/blog/${id}`;
export { createPostApi, getAllPostsApi, getBlogById };
