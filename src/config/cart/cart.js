import { SERVER_URL_JAVA, SERVER_URL_NODEJS } from "../base/base";

const getCartApi = `${SERVER_URL_NODEJS}/api/cart/get`;

const addToCartByIdUser = id => `${SERVER_URL_JAVA}/api/user/addtocart/${id}`;

const removeCartByIdUser = id => `${SERVER_URL_JAVA}/api/user/removecart/${id}`;

const checkoutUserApi = `${SERVER_URL_NODEJS}/api/checkout/post`;

const getInvoicesByPage = `${SERVER_URL_NODEJS}/api/checkout/invoices`;
export {
    getCartApi,
    addToCartByIdUser,
    removeCartByIdUser,
    checkoutUserApi,
    getInvoicesByPage
}