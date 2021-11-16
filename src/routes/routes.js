import { Route, Switch, Redirect } from "react-router-dom";
import {
  HOME_PAGE,
  BLOG_PAGE,
  CHECK_OUT_PAGE,
  SHOP,
  DETAIL,
  SIGN_IN_PAGE,
  PRODUCT_LIST,
  RESET_PASSWORD,
  REGISTER_PAGE,
  PAGE_VERIFY_FIRST,
  VERIFY_ACCOUNT,
  PAGE_SUCCESS_REGISTER,
  NOT_FOUND,
  RESET_PASSWORD_VERIFY,
  SUCCESS_CHANGE_PASSWORD,
  DASHBOARD_MATERIAL,
  DASHBOARD,
  BLOG_DETAIL,
} from "../components/link/link";
import {
  Index,
  Blog,
  Shop,
  DetailItem,
  SignIn,
  TypeProduct,
  Reset,
  Register,
  RegisterOTP,
  VerifyAccount,
  SuccessVerified,
  Checkout,
  NotFound,
  ResetPassword,
  SuccessChangePassword,
  DashBoardBasic,
  ProductAdmin as DashBoardProduct,
  UserInformation,
  BlogDashboard,
  DetailBlog,
} from "../views/ViewConfig/ViewConfig";
export const RoutesConfig = [
  {
    path: HOME_PAGE,
    exact: true,
    component: Index,
  },
  {
    path: SHOP,
    exact: true,
    component: Shop,
  },
  {
    path: DETAIL,
    component: DetailItem,
  },
  {
    path: SIGN_IN_PAGE,
    component: SignIn,
    exact: true,
  },
  {
    path: PRODUCT_LIST,
    component: TypeProduct,
  },
  {
    path: RESET_PASSWORD,
    component: Reset,
  },
  {
    path: BLOG_PAGE,
    component: Blog,
    exact: true,
  },
  {
    path: BLOG_DETAIL,
    component: DetailBlog,
  },
  {
    path: REGISTER_PAGE,
    component: Register,
    exact: true,
  },
  {
    path: PAGE_VERIFY_FIRST,
    component: RegisterOTP,
  },
  {
    path: VERIFY_ACCOUNT,
    component: VerifyAccount,
  },
  {
    path: PAGE_SUCCESS_REGISTER,
    component: SuccessVerified,
  },
  {
    path: CHECK_OUT_PAGE,
    component: Checkout,
  },
  {
    path: RESET_PASSWORD_VERIFY,
    component: ResetPassword,
  },
  {
    path: SUCCESS_CHANGE_PASSWORD,
    component: SuccessChangePassword,
  },
  {
    path: `${DASHBOARD}${DASHBOARD_MATERIAL.GENERAL[0].path}`,
    component: DashBoardBasic,
  },
  {
    path: `${DASHBOARD}${DASHBOARD_MATERIAL.GENERAL[1].path}`,
    component: UserInformation,
  },
  {
    path: `${DASHBOARD}${DASHBOARD_MATERIAL.ADMIN[3].path}`,
    component: DashBoardProduct,
  },
  {
    path: `${DASHBOARD}${DASHBOARD_MATERIAL.ADMIN[1].path}`,
    component: BlogDashboard,
  },
  {
    path: NOT_FOUND,
    component: NotFound,
  },
];

const RouteMapConfig = () => {
  return (
    <Switch>
      {RoutesConfig.map((route, index) => {
        return <Route {...route} key={index} />;
      })}
      <Redirect from="*" to={NOT_FOUND} />
    </Switch>
  );
};

export default RouteMapConfig;
