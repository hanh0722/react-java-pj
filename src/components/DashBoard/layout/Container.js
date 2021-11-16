import React from "react";
// import { Redirect } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { checkUserIsAuth } from "../../store/IsAuth/is-auth";
import RightSide from "../RightSide/RightSide";
import SideBar from "../Sidebar/Sidebar";
import styles from "./Container.module.scss";
// import useFetch from "../../../hook/use-fetch";
// import { getUserApi } from "../../../config/url";
// import { NOT_FOUND, SIGN_IN_PAGE } from "../../link/link";
// import { userDataActions } from "../../store/GetUserData/get-user-data";
const Container = (props) => {
  // const dispatch = useDispatch();
  // const {token, isLoggedIn} = useSelector((state) => state.isAuth);
  // const { getDataFromServerHandler, data, error, isLoading, resetAllHandler } =
  //   useFetch();
  //   // don't put useEffect check in container => it'll render everytime user move to other page, not good for data so far
  // useEffect(() => {
  //   dispatch(checkUserIsAuth());
  // }, [dispatch]);
  // const getUserFromServer = useCallback(() => {
  //   getDataFromServerHandler({
  //     url: getUserApi,
  //     options: {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   });
  // }, [getDataFromServerHandler, token]);
  // useEffect(() => {
  //   if(!token){
  //     return;
  //   }
  //   getUserFromServer();
  //   return () => {
  //     resetAllHandler();
  //   }
  // }, [getUserFromServer, token, resetAllHandler]);
  // useEffect(() => {
  //   if(isLoading){
  //     dispatch(userDataActions.isLoadingFetch());
  //   } else {
  //     if(!data || error){
  //       dispatch(userDataActions.finishedLoading());
  //       return;
  //     }
  //     dispatch(userDataActions.getUserFromServer(data));
  //   }
  // }, [isLoading, data, error, dispatch]);
  return (
    <>
      {/* {!isLoggedIn && <Redirect to={SIGN_IN_PAGE}/>}
      {!isLoading && error && <Redirect to={NOT_FOUND} />} */}
      <div className={styles.container}>
        <SideBar />
        <RightSide>{props.children}</RightSide>
      </div>
    </>
  );
};

export default Container;
