import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import Container from "../../components/DashBoard/layout/Container";
import Form from "../../components/DashBoard/Product/Form/Form";
import Grid from "../../components/DashBoard/UI/Grid/Grid";
import ProductOptions from "../../components/DashBoard/Product/ProductOptions/ProductOptions";
import useFetch from "../../hook/use-fetch";
import { uploadProductApi } from "../../config/post/post";
import {
  getProductById,
  updateProductById,
} from "../../config/product/product";
import Transition from "../../components/Transition/Transition";
import FixLayout from "../../components/FixLayout/FixLayout";
import styles from "../../styles/ProductView.module.scss";
import Overlay from "../../components/overlay/Overlay";
import {
  DASHBOARD_MATERIAL,
  DASHBOARD,
  NOT_FOUND,
} from "../../components/link/link";
import { uploadActions } from "../../components/store/UploadProduct/UploadProduct";
import useAxios from "../../hook/use-axios";
const Product = () => {
  const stateProduct = useSelector((state) => state.upload);
  const token = useSelector((state) => state.isAuth.token);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    isLoading: isLoadingProduct,
    fetchDataFromServer: getProductHandler,
    error: errorProduct,
    data: dataProduct,
  } = useAxios();
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const edit = params.get("edit");
    return {
      id: id,
      edit: edit ? Boolean(edit) : false,
    };
  }, [location.search]);
  useEffect(() => {
    const { id, edit } = query;
    if (!id || !edit) {
      return;
    }
    getProductHandler({
      url: getProductById(id),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }, [query, token, getProductHandler]);
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
    const { edit, id } = query;
    event.preventDefault();
    const product = {
      title: stateProduct.title,
      description: stateProduct.description,
      in_stock: stateProduct.inStock,
      category: stateProduct.type,
      regular_price: +stateProduct.regularPrice,
      sale_percent: +stateProduct.salePercent,
      last_price: +stateProduct.lastPrice,
      image_urls: getFile,
    };
    getDataFromServerHandler({
      url: edit ? updateProductById(id) : uploadProductApi,
      options: {
        method: edit ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    });
  };
  const setFileHandler = useCallback((data) => {
    setFiles(data);
  }, []);
  const openModalHandler = useMemo(() => {
    if (!isLoading && error) {
      return true;
    }
    if (!isLoading && data && !error) {
      return true;
    }
    return false;
  }, [isLoading, error, data]);

  useEffect(() => {
    const { edit, id } = query;
    if (!edit || !id) {
      return;
    }
    if (!isLoadingProduct && dataProduct) {
      dispatch(
        uploadActions.setValueProduct({
          ...dataProduct?.data,
        })
      );
      setFiles(dataProduct?.data?.imageUrls);  
    }
  }, [query, dispatch, dataProduct, isLoadingProduct]);
  console.log(stateProduct);
  return (
    <>
      {!isLoadingProduct && errorProduct && <Redirect to={NOT_FOUND} />}
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
              {!error &&
                data &&
                status === 200 &&
                "Uploaded product successfully"}
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
            <Form
              setFileIsUploading={setFileIsUploading}
              setIsLoadingUpload={setIsLoadingUpload}
              setFileHandler={setFileHandler}
              initialTitle={dataProduct?.data?.title || ""}
              defaultValueEditor={dataProduct?.data?.description || ""}
              defaultImage={dataProduct?.data?.imageUrls || null}
            />
            <ProductOptions
              isLoading={isLoading || fileIsUploading}
              onSubmit={uploadProductHandler}
              isLoadingUpload={isLoadingUpload}
              defaultRegular={dataProduct?.data?.regularPrice || ""}
              defaultSale={dataProduct?.data?.salePercent || ""}
              defaultType={dataProduct?.data?.category?.toUpperCase() || ""}
              defaultInStock={dataProduct?.data?.inStock || true}
              isEdit={query.edit}
            />
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Product;
