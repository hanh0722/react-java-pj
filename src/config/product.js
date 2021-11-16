import { serverUrl } from "./url";

const api = `${serverUrl}/api/product`;

const getAllProductsFromServer = `${api}/products`;

const getProductByType = `${api}/get`;
const getProductById = (id) => {
  return `${api}/products/${id}`;
};
const getAllTypesOfProducts = `${api}/get/type`;
export {
  getAllProductsFromServer,
  getProductById,
  getProductByType,
  getAllTypesOfProducts,
};
