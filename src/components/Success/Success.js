import React, { useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import banner from "../../image/verify-first.png";
import styles from "./Success.module.scss";
import Container from "../layout/container/Container";
import useFetch from "../../hook/use-fetch";
import { urlGetInforUser } from "../../config/url";
import Ripple from "../Loading/Ripple/Ripple";
import ContainerEmpty from "../layout/container-empty/ContainerEmpty";
import { NOT_FOUND } from "../link/link";
import ContentUser from "./ContentUser/ContentUser";
const Success = ({ params }) => {
  const { data, error, isLoading, getDataFromServerHandler } = useFetch();
  const getUserId = useMemo(() => {
    const getParams = new URLSearchParams(params);
    return getParams.get("id");
  }, [params]);
  useEffect(() => {
    getDataFromServerHandler({
      url: urlGetInforUser(getUserId),
    });
  }, [getDataFromServerHandler, getUserId]);
  return (
    <Container className={styles.container}>
      {isLoading && (
        <ContainerEmpty className="d-flex justify-content-center align-items-center">
          <Ripple />
        </ContainerEmpty>
      )}
      {!isLoading && data && !error && (
        <>
          <div className={styles.image}>
            <img src={banner} alt="" />
          </div>
          <ContentUser email={data.email} />
          <div className={`text-center ${styles.button}`}>
            <a href="https://mail.google.com" rel="noreferrer" target="_blank">
              <Button variant="contained">Go to email!</Button>
            </a>
          </div>
        </>
      )}
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
    </Container>
  );
};

export default Success;
