import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Input from "../../../input/Input";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DASHBOARD, DASHBOARD_MATERIAL } from "../../../link/link";
import useAxios from "../../../../hook/use-axios";
import useInput from "../../../../hook/use-input";
import { getBlogByKeyword } from "../../../../config/post/post";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
import useToggle from "../../../../hook/use-toggle";
const Header = () => {
  const { isLoading, fetchDataFromServer, error, data } = useAxios();
  const { value, changeInputHandler } = useInput((value) => true);
  const [isTyping, setIsTyping] = useState(false);
  const { toggle, changeToggleHandler } = useToggle(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(false);
      fetchDataFromServer({
        url: getBlogByKeyword,
        params: {
          query: value,
        },
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
      setIsTyping(true);
    };
  }, [value, fetchDataFromServer]);

  const onChangeInputHandler = (event) => {
    changeInputHandler(event);
  };
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles.header}`}
    >
      <div className="position-relative">
        <Input
          className={styles.input}
          input={{
            type: "text",
            placeholder: "Search Posts...",
            onChange: onChangeInputHandler,
            value: value,
            onClick: changeToggleHandler,
          }}
        />
        <ul
          style={{ height: data?.data?.blogs?.length < 3 ? "100px" : "150px" }}
          className={`${styles.list} w-100 ${toggle && styles.show}`}
        >
          {(isLoading || isTyping) && <Skeleton times={5} />}
          {!isLoading &&
            data &&
            !isTyping &&
            data?.data?.blogs?.map((item) => {
              return (
                <li className={styles.content} key={item._id}>
                  {item?.title}
                </li>
              );
            })}
          {!isLoading && error && <li>Cannot get information</li>}
          {!isLoading && data && !isTyping && data?.data?.blogs?.length === 0 && (
            <p>
              No exist post with <span className="error__text">{value}</span>
            </p>
          )}
        </ul>
      </div>
      <Link to={`${DASHBOARD}${DASHBOARD_MATERIAL.ADMIN[1].path}`}>
        <Button variant="contained" className={styles.button}>
          Create Blog
        </Button>
      </Link>
    </div>
  );
};

export default Header;
