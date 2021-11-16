import { configureStore } from "@reduxjs/toolkit";
import hamburgerSlice from "./hamburgerSlice";
import buttonSlice from "./button-top";
import CartSlice from "./cart";
import ProductSlice from "./Product";
import wishListSlice from "./wish-list";
import styleDetailSlice from "./style-detail";
import NotifySlice from "./NotifyAfterLogin/NotifyAfterLogin";
import isAuthSlice from "./IsAuth/is-auth";
import userDataSlice from "./GetUserData/get-user-data";
import uploadProductSlice from "./UploadProduct/UploadProduct";
import progressSlice from "./ProgressLoading/ProgressLoading";
import navigationDashSlice from "./NavigationDash/navigation-dash";
import citySlice from "./GetCity/get-city";
const store = configureStore({
    reducer: {
        hamburger: hamburgerSlice.reducer,
        button: buttonSlice.reducer,
        cart: CartSlice.reducer,
        product: ProductSlice.reducer,
        wishlist: wishListSlice.reducer,
        detail: styleDetailSlice.reducer,
        notifyMessage: NotifySlice.reducer,
        isAuth: isAuthSlice.reducer,
        user: userDataSlice.reducer,
        upload: uploadProductSlice.reducer,
        progress: progressSlice.reducer,
        nav: navigationDashSlice.reducer,
        city: citySlice.reducer,
    }
})

export default store;