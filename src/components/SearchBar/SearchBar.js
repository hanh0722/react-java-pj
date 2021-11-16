import React from "react";
import Input from "../input/Input";
import styles from "./SearchBar.module.scss";
import useInput from "../../hook/use-input";
import CloseButton from "../UI/CloseButton";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { hamburgerActions } from "../store/hamburgerSlice";
import Overlay from "../overlay/Overlay";
import ReactDOM from "react-dom";
import SearchItems from "../SearchItems/SearchItems";
import { Container, Row } from "react-bootstrap";
import DUMMY_DATA from "../DummyData/DUMMY_DATA";
import { Button } from "@material-ui/core";

const SearchBar = ({ isShowed }) => {
  const {
    valid,
    value,
    changeInputHandler,
    touchedInputHandler,
    isTouched,
    resetHandler,
  } = useInput((value) => value.trim().length > 0);
  const dispatch = useDispatch();
  const changeLayoutHandler = () => {
    dispatch(hamburgerActions.searchSlide());
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const renderListItems = DUMMY_DATA.filter((items) => {
    return items.name.trim().toLowerCase().includes(value.toLowerCase());
  });
  return (
    <CSSTransition
      in={isShowed}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="slide"
    >
      <>
        <form onSubmit={submitHandler} className={styles.container}>
          <Container className={styles["grid__layout"]} fluid>
            <div className={`${styles["line__box"]} w-100 p-20`}>
              <div
                className={`d-flex justify-content-between align-items-center ${styles.row}`}
              >
                <p>Search our store...!</p>
                <CloseButton
                  onClick={() => {
                    changeLayoutHandler();
                    resetHandler();
                  }}
                />
              </div>
              <Input
                input={{
                  placeholder: "Search Products...",
                  onChange: changeInputHandler,
                  onBlur: touchedInputHandler,
                  value: value,
                  className: !valid && isTouched ? "error__input" : "",
                }}
                hasValue={value.trim().length > 0}
                setValueHandler={resetHandler}
              />
              {!valid && isTouched && (
                <p className="error__text">Searching box is empty!</p>
              )}
              {value.trim().length > 0 && renderListItems.length === 0 && (
                <p className="error__text text-center">
                  No result for <span>"{value}"</span>
                </p>
              )}
            </div>
            {value.trim().length > 0 && (
              <div className={styles["flow__items"]}>
                {renderListItems.length > 0 && (
                  <>
                    <p className="text-center pt-3">
                      <span className={styles.title}>
                        Found {renderListItems.length} results for:
                      </span>{" "}
                      "{value}"
                    </p>
                    <Row className={`${styles.items}`}>
                      {value.trim().length !== 0 &&
                        renderListItems.map((product, index) => {
                          if (index <= 5) {
                            return (
                              <SearchItems
                                key={product.id}
                                type={product.type}
                                price={product.price}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                id={product.id}
                                resetHandler={resetHandler}
                              />
                            );
                          }
                          return "";
                        })}
                    </Row>
                    {renderListItems.length > 0 && (
                      <div className={`text-center pt-4`}>
                        <Button
                          type="submit"
                          className="button"
                          variant="contained"
                        >
                          More Results!
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </Container>
        </form>
        {ReactDOM.createPortal(
          <Overlay
            onClick={() => {
              changeLayoutHandler();
              resetHandler();
            }}
          />,
          document.getElementById("bg__ol")
        )}
      </>
    </CSSTransition>
  );
};

export default SearchBar;
