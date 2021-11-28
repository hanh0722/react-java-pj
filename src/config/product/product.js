import { SERVER_URL_NODEJS, SERVER_URL_JAVA } from "../base/base";

const getAllProductFromServer = `${SERVER_URL_NODEJS}/api/product/get`;

const getAllTypesOfProducts = `${SERVER_URL_JAVA}/api/product/types`;

const getProductByType = type => `${SERVER_URL_NODEJS}/api/product/get/${type}`;

const getProductById = id => `${SERVER_URL_JAVA}/api/product/get/${id}`;

const getProductByKeyword = `${SERVER_URL_NODEJS}/api/product/search`;

const removeProductById = `${SERVER_URL_NODEJS}/api/product/delete`;

const updateProductById = id => `${SERVER_URL_JAVA}/api/product/update/${id}`;
export {
    getAllProductFromServer,
    getAllTypesOfProducts,
    getProductByType,
    getProductById,
    getProductByKeyword,
    removeProductById,
    updateProductById
}