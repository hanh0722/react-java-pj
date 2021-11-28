import React, { useEffect, useState } from "react";
import Header from "../../components/DashBoard/AllProducts/Header/Header";
import Container from "../../components/DashBoard/layout/Container";
import { DASHBOARD } from "../../components/link/link";
import NormalInput from "../../components/input/NormalInput/NorInput";
import styles from "../../components/DashBoard/AllProducts/styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Ripple from "../../components/UI/Ripple/Ripple";
import TableProduct from "../../components/DashBoard/AllProducts/TableProduct/TableProduct";
import { getProductByKeyword } from "../../config/product/product";
import useAxios from "../../hook/use-axios";
import { CSSTransition } from "react-transition-group";
import useToggle from "../../hook/use-toggle";
import Skeleton from "../../components/UI/LoadingSkeleton/Skeleton";
const AllProducts = () => {
  const { toggle, changeToggleHandler } = useToggle(false);
  const { isLoading, error, data, fetchDataFromServer } = useAxios();
  const [keyword, setKeyword] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (keyword === null) {
      return;
    }
    const timeout = setTimeout(() => {
      fetchDataFromServer({
        url: getProductByKeyword,
        params: {
          keyword: keyword,
        },
      });
      setIsTyping(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
      setIsTyping(true);
    };
  }, [keyword, fetchDataFromServer]);

  console.log(data);
  console.log(isTyping);
  const changeInputHandler = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <Container>
      <Header
        title="List Products"
        button="Create Product"
        url={`${DASHBOARD}/product`}
      />
      <div className={styles.box}>
        <div className="d-flex justify-content-between align-items-center">
          <div className={`position-relative ${styles["search--bar"]}`}>
            <NormalInput
              input={{
                type: "text",
                placeholder: "Search Product...",
                onChange: changeInputHandler,
                onClick: changeToggleHandler,
                autoComplete: "off",
                id: "search",
              }}
              className={styles.input}
            />
            <FontAwesomeIcon icon={faSearch} />
            <CSSTransition
              classNames="show"
              timeout={750}
              unmountOnExit
              mountOnEnter
              in={toggle}
            >
              <ul className={`${styles.list} position-absolute`}>
                {(isLoading || isTyping) && <Skeleton times={8} />}
                {!isLoading &&
                  data &&
                  !isTyping &&
                  (data?.data?.products?.length === 0 ? (
                    <p>Cannot find products</p>
                  ) : (
                    data?.data?.products?.map((item) => {
                      return <li key={item?._id}>{item?.title}</li>;
                    })
                  ))}
                  {!isLoading && error && <p>Cannot get data</p>}
              </ul>
            </CSSTransition>
          </div>
          <Ripple
            className={`d-flex justify-content-center align-items-center rounded-circle flex-column ${styles.filter}`}
          >
            <div></div>
            <div></div>
            <div></div>
          </Ripple>
        </div>
        <TableProduct />
      </div>
    </Container>
  );
};

export default AllProducts;
