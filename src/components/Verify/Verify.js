import React, { useRef, useEffect, useMemo } from "react";
import Container from "../layout/container/Container";
import BoxVerify from "./BoxVerify/BoxVerify";
import styles from "./Verify.module.scss";
import { Button } from "@material-ui/core";
import { Redirect, useLocation } from "react-router-dom";
import useFetch from "../../hook/use-fetch";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import ReactDOM from "react-dom";
import useInterval from "../../hook/use-interval";
import { urlCheckVerify } from "../../config/url";
import Ripple from "../Loading/Ripple/Ripple";
const Verify = (props) => {
  const location = useLocation();
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const thirdInputRef = useRef();
  const fourthInputRef = useRef();
  const { time, startCountingHandler } = useInterval(5, false);
  const submitVerifyHandler = (event) => {
    event.preventDefault();
    const firstInput = firstInputRef.current.value;
    const secondInput = secondInputRef.current.value;
    const thirdInput = thirdInputRef.current.value;
    const fourthInput = fourthInputRef.current.value;
    const OTP = firstInput + secondInput + thirdInput + fourthInput;
    props.verifyOTP(OTP);
  };
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  const params = useMemo(() => {
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    return {
      id: id,
      token: token,
    };
  }, [searchParams]);
  const { isLoading, error, data, getDataFromServerHandler } = useFetch();
  useEffect(() => {
    // check valid user if it's doesnt valid => redirect
    const getUrl = urlCheckVerify(params.id, params.token);
    getDataFromServerHandler({
      url: getUrl,
    });
  }, [getDataFromServerHandler, params.id, params.token]);
  useMemo(() => {
    if (error && !data) {
      startCountingHandler();
    }
  }, [error, startCountingHandler, data]);
  return (
    <>
      {error && !isLoading && time === 0 && <Redirect to="/" />}
      <Container>
        {isLoading && (
          <Loading
            className={`${styles.loading} d-flex justify-content-center align-items-center`}
          />
        )}
        {!isLoading && data && (
          <>
            <p className={`text-center ${styles.title}`}>
              Press 4 number OTP in your email!
            </p>
            <form
              onSubmit={submitVerifyHandler}
              className={`${styles["form--verify"]} text-center`}
            >
              <div
                className={`d-flex justify-content-center align-items-center`}
              >
                <BoxVerify ref={firstInputRef} />
                <BoxVerify ref={secondInputRef} />
                <BoxVerify ref={thirdInputRef} />
                <BoxVerify ref={fourthInputRef} />
              </div>
              <Button
                variant="contained"
                type="submit"
                className={styles.submit}
              >
                Submit
              </Button>
              {props.loadingOTP && <Ripple className="pt-3"/>}
              {props.errorOTP && <p className='error__text'>Your OTP is wrong!</p>}
              {props.checkErrorOTP && <p className='error__text'>OTP must be 4 numbers</p>}
            </form>
          </>
        )}

        {!isLoading &&
          error &&
          ReactDOM.createPortal(
            <Error>
              <p>Your url is expired or not valid, please try again</p>
              <p>
                You will be redirect after{" "}
                <span style={{ color: "red" }}>{time}</span> seconds
              </p>
            </Error>,
            document.getElementById("bg__ol")
          )}
      </Container>
    </>
  );
};

export default Verify;
