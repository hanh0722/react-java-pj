import React from "react";
import styles from "./Blog.module.scss";
import classes from '../../../DashBoard/AllBlogs/styles.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import useToggle from "../../../../hook/use-toggle";
import { CSSTransition } from "react-transition-group";
import FixLayout from "../../../FixLayout/FixLayout";
import {Button} from '@material-ui/core';
import ReactDOM from 'react-dom';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Overlay from '../../../overlay/Overlay';
const Blog = ({ url, src, date, title, className, id, removeItemByKey }) => {
  const { toggle, changeToggleHandler } = useToggle(false);
  const {toggle: toggleModel, changeToggleHandler: changeToggleModel} = useToggle(false);
  return (
    <>
      <div className={`${styles.link} ${className}`}>
        <div className={`${styles.container}`}>
          <div className={`position-relative ${styles.image}`}>
            <img src={src} alt="" />
            {/* <div className={styles.avatar}>
          <img
            src={"https://minimals.cc/static/mock-images/covers/cover_3.jpg"}
            alt=""
          />
          </div> */}
          </div>
          <div className={styles.content}>
            <div className={styles.text}>
              <p className={styles.date}>{date}</p>
              <p>{title}</p>
            </div>
          </div>
          <div
            onClick={changeToggleHandler}
            className={`${styles.options} ${toggle && styles.color}`}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="ellipsis-h"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-3x"
            >
              <path
                fill="currentColor"
                d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                className=""
              ></path>
            </svg>
            <ul className={`${styles.list} ${toggle && styles.show}`}>
              <Link
                to={url}
                className="d-flex align-items-center justify-content-between"
              >
                <li>Update</li>
                <span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="pen"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-pen fa-w-16 fa-3x"
                  >
                    <path
                      fill="currentColor"
                      d="M493.26 56.26l-37.51-37.51C443.25 6.25 426.87 0 410.49 0s-32.76 6.25-45.25 18.74l-74.49 74.49L256 127.98 12.85 371.12.15 485.34C-1.45 499.72 9.88 512 23.95 512c.89 0 1.79-.05 2.69-.15l114.14-12.61L384.02 256l34.74-34.74 74.49-74.49c25-25 25-65.52.01-90.51zM118.75 453.39l-67.58 7.46 7.53-67.69 231.24-231.24 31.02-31.02 60.14 60.14-31.02 31.02-231.33 231.33zm340.56-340.57l-44.28 44.28-60.13-60.14 44.28-44.28c4.08-4.08 8.84-4.69 11.31-4.69s7.24.61 11.31 4.69l37.51 37.51c6.24 6.25 6.24 16.4 0 22.63z"
                      className=""
                    ></path>
                  </svg>
                </span>
              </Link>
              <div
                onClick={changeToggleModel}
                className="d-flex align-items-center justify-content-between"
              >
                <li>Delete</li>
                <span>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <CSSTransition
        timeout={750}
        unmountOnExit
        mountOnEnter
        classNames="scale-fix"
        in={toggleModel}
      >
        <FixLayout className={`text-center ${classes.layout}`}>
          <span onClick={changeToggleModel} className={classes.close}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <p>Are you sure you want to delete this blog?</p>
          <div
            className={`d-flex align-items-center justify-content-center pt-4 ${classes.row}`}
          >
            <Button onClick={() => removeItemByKey(id)} variant="contained">Delete</Button>
            <Button onClick={changeToggleModel} variant="outlined">Cancel</Button>
          </div>
          {ReactDOM.createPortal(
            <Overlay style={{ zIndex: "101" }} />,
            document.getElementById("bg__ol")
          )}
        </FixLayout>
      </CSSTransition>
    </>
  );
};

export default Blog;
