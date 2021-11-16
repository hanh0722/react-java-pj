import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MessageSideBar.module.scss";
import "../styles/animation-transition.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NotifyActions } from "../store/NotifyAfterLogin/NotifyAfterLogin";
const MessageSideBar = (props) => {
  const dispatch = useDispatch();
  const stateSlice = useSelector((state) => state.notifyMessage);
  const isAuthExpire = useSelector((state) => state.isAuth.expired);
  useEffect(() => {
    const timeoutNotify = setTimeout(() => {
      dispatch(NotifyActions.removeNotify());
    }, 5000);
    const timeoutMessage = setTimeout(() => {
      dispatch(NotifyActions.removeMessageAndCode());
    }, 6000);
    return () => {
      clearTimeout(timeoutNotify);
      clearTimeout(timeoutMessage);
    }
  }, [dispatch, stateSlice.showed]);
  useEffect(() => {
    if (!isAuthExpire) {
      return;
    }
    dispatch(
      NotifyActions.showedNotify({
        message: "Your url is expired, please sign in again",
        code: 400,
      })
    );
  }, [isAuthExpire, dispatch]);
  return (
    <div
      className={`${styles.message} ${stateSlice.showed && styles.back} ${
        stateSlice.code === 200 ? styles.success : styles.failed
      }`}
    >
      <div
        onClick={() => {
          dispatch(NotifyActions.removeNotify());
        }}
        className={`${styles.close} d-flex justify-content-center align-items-center`}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      {stateSlice.message}
      {props.children}
    </div>
  );
};
export default React.memo(MessageSideBar);
