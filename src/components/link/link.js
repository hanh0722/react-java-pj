import { faDesktop, faPercentage, faShoppingCart, faBan, faHome, faStore} from "@fortawesome/free-solid-svg-icons";
import { faUser, faChartBar, faNewspaper } from "@fortawesome/free-regular-svg-icons";

export const HOME_PAGE = '/';
export const SHOP = '/shop';
export const SIGN_IN_PAGE = '/sign-in';
export const WISH_LIST_PAGE = '/wish-list';
export const CART_PAGE = '/cart';
export const BLOG_PAGE = '/blogs';
export const REGISTER_PAGE = '/register';
export const RESET_PASSWORD = '/sign-in/reset';
export const CHECK_OUT_PAGE = '/checkout';
export const VERIFY_ACCOUNT = '/register/verify';
export const PAGE_VERIFY_FIRST = '/register/success';
export const PAGE_SUCCESS_REGISTER = '/verified/success';
export const RESET_PASSWORD_VERIFY = '/reset/validation';
export const SUCCESS_RESET = '/reset/success';
export const SUCCESS_CHANGE_PASSWORD = '/success';
export const PRODUCTS = {
    INDOOR: '/products/indoor',
    OUTDOOR: '/products/outdoor',
    VEGGIES: '/products/herbs-veggies'
};
export const BLOG_DETAIL = '/blogs/:id/:name';
export const DETAIL = '/shop/:name';
export const PRODUCT_LIST = '/products/:type';
export const NOT_FOUND = '/404';
export const DASHBOARD = '/dashboard';
export const DASHBOARD_MATERIAL = {
    GENERAL: [
        {
            icon: faDesktop,
            name: 'Basic',
            path: '/basic'
        },
        {
            icon: faUser,
            name: 'User information',
            path: '/information'
        },
        {
            icon: faPercentage,
            name: 'My Voucher',
            path: '/voucher'
        }
    ],
    ECOMMERCE: [
        {
            icon: faShoppingCart,
            name: 'Orders',
            path: '/orders'
        },
        {
            icon: faBan,
            name: 'Orders cancelled',
            path: '/cancel'
        },
        {
            icon: faChartBar,
            name: 'Analytics',
            path: '/analytics'
        }
    ],
    ADMIN: [
        {
            icon: faHome,
            name: 'General',
            path: '/general'
        },
        {
            icon: faNewspaper,
            name: 'Blog',
            path: '/blog'
        },
        {
            icon: faUser,
            name: 'User',
            path: '/user'
        },
        {
            icon: faStore,
            name: 'Product',
            path: '/product'
        }
    ],
    CHANGE_VALUE_USER: '/user/account'
}