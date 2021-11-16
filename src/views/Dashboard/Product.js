import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import Container from "../../components/DashBoard/layout/Container";
import Form from "../../components/DashBoard/Product/Form/Form";
import Grid from "../../components/DashBoard/UI/Grid/Grid";
import ProductOptions from "../../components/DashBoard/Product/ProductOptions/ProductOptions";
import useFetch from "../../hook/use-fetch";
import { uploadProductApi } from "../../config/url";
import { key_multer } from "../../util/key-server";
import Transition from "../../components/Transition/Transition";
import FixLayout from "../../components/FixLayout/FixLayout";
import styles from "../../styles/ProductView.module.scss";
import Overlay from "../../components/overlay/Overlay";
import {DASHBOARD_MATERIAL, DASHBOARD} from '../../components/link/link';

const Product = () => {
  const stateProduct = useSelector((state) => state.upload);
  const token = useSelector((state) => state.isAuth.token);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const {
    getDataFromServerHandler,
    error,
    isLoading,
    data,
    status,
    resetAllHandler,
  } = useFetch();
  const [getFile, setFiles] = useState([]);
  const uploadProductHandler = (event) => {
    event.preventDefault();
    const product = {
      title: stateProduct.title,
      description: stateProduct.description,
      inStock: stateProduct.inStock,
      type_product: stateProduct.type,
      regular_price: +stateProduct.regularPrice,
      sale_percent: +stateProduct.salePercent,
      last_price: +stateProduct.lastPrice,
    };
    const formData = new FormData();
    getFile.forEach((file) => {
      formData.append(key_multer, file);
    });
    const turnProductToEntries = Object.entries(product);
    turnProductToEntries.forEach(([key_pair, value]) => {
      formData.append(key_pair, value);
      // destructuring array of object entries
    });
    getDataFromServerHandler({
      url: uploadProductApi,
      options: {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      },
    });
  };
  const setFileHandler = useCallback((data) => {
    setFiles(data);
  }, []);
  const openModalHandler = useMemo(() => {
    if(!isLoading && error){
      return true;
    };
    if(!isLoading && data && !error){
      return true;
    }
    return false;
  }, [isLoading, error, data]);
  return (
    <>
      <Transition
        options={{
          in: openModalHandler,
          timeout: 750,
          classNames: "scale-fix",
          unmountOnExit: true,
          mountOnEnter: true,
        }}
      >
        <>
          <FixLayout
            className={`${styles.container} ${error && styles.error} ${
              data && !error && styles.success
            }`}
          >
            <p>
              {status === 500 && "Something went wrong, please try again"}
              {(status === 401 || status === 422) &&
                "Please fill the form to upload product"}
              {!error && data && status === 200 && "Uploaded product successfully"}
            </p>
            <div className={styles["button-line"]}>
              {error && (
                <Button onClick={resetAllHandler} variant="contained">
                  Confirm
                </Button>
              )}
              {!error && data && (
                <Link to={`${DASHBOARD}${DASHBOARD_MATERIAL.GENERAL[0].path}`}>
                  <Button onClick={resetAllHandler} variant="contained">
                    Back to dashboard
                  </Button>
                </Link>
              )}
            </div>
          </FixLayout>
          {ReactDOM.createPortal(
            <Overlay onClick={resetAllHandler} />,
            document.getElementById("portal__pd")
          )}
        </>
      </Transition>
      <Container>
        <form onSubmit={uploadProductHandler}>
          <Grid>
            <Form setIsLoadingUpload={setIsLoadingUpload} setFileHandler={setFileHandler} />
            <ProductOptions
              isLoading={isLoading}
              onSubmit={uploadProductHandler}
              isLoadingUpload={isLoadingUpload}
            />
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Product;
