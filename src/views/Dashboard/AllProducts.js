import React from "react";
import Header from "../../components/DashBoard/AllProducts/Header/Header";
import Container from "../../components/DashBoard/layout/Container";
import { DASHBOARD } from "../../components/link/link";
import NormalInput from "../../components/input/NormalInput/NorInput";
import styles from "../../components/DashBoard/AllProducts/styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Ripple from "../../components/UI/Ripple/Ripple";
import TableProduct from "../../components/DashBoard/AllProducts/TableProduct/TableProduct";
const AllProducts = () => {
  const changeInputHandler = (event) => {
    console.log(event.target.value);
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
                id: "search",
              }}
              className={styles.input}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <Ripple
            className={`d-flex justify-content-center align-items-center rounded-circle flex-column ${styles.filter}`}
          >
            <div></div>
            <div></div>
            <div></div>
          </Ripple>
        </div>
        <TableProduct/>
      </div>
    </Container>
  );
};

export default AllProducts;
