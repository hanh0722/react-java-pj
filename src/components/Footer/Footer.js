import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Footer.module.scss";
import logo from "../../image/logo.png";
import logoDarkTheme from "../../image/logo-dark.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../darkmode-context/darkmode-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const listAbout = ["about us", "contact us", "FAQs", "blog"];
const informationList = [
  "Register",
  "login",
  "my cart",
  "wishlist",
  "product compare",
];

const iconsSocial = [faFacebook, faTwitter, faInstagram];
const Footer = () => {
  const textRefTransform = useRef();
  const [state, setState] = useState(null);
  useEffect(() => {
    const textContent = textRefTransform.current.textContent;
    const splitText = textContent.split('');
    const mapItem = splitText.map((item, index) => {
      return <span key={index} data-aos="fade-down" data-aos-delay={250 * index}>{item}</span>
    })
    setState(mapItem);
  }, []);
  const DarkModeCtx = useContext(DarkModeContext);
  return (
    <footer className={styles["layout-ft"]}>
      <div className={styles.footer}>
        <div className={styles["list__items"]}>
          <div className={styles.logo}>
            <img src={DarkModeCtx.dark ? logoDarkTheme : logo} alt="logo" />
          </div>
          <div className={styles["first__list"]}>
            <h4 ref={textRefTransform}>{!state ? "Don't miss a thing" : state} </h4>
          </div>
        </div>
        <ul>
          <li data-aos="fade-down" className={styles["title__list"]}>About</li>
          {listAbout.map((item, index) => {
            return (
              <Link key={index} to="/">
                <li data-aos="fade-down" data-aos-delay={250 * (index + 1)}>{item}</li>
              </Link>
            );
          })}
        </ul>
        <ul>
          <li data-aos="fade-down" className={styles["title__list"]}>Information</li>
          {informationList.map((item, index) => {
            return (
              <Link key={index} to="/">
                <li data-aos="fade-down" data-aos-delay={250 * (index + 1)}>{item}</li>
              </Link>
            );
          })}
        </ul>
        <ul>
          <li data-aos="fade-down" className={styles["title__list"]}>Our Store</li>
          <div className="d-flex">
            {iconsSocial.map((item, index) => {
              return (
                <Link to="/" key={index}>
                  <li data-aos='fade-down' data-aos-delay={250 * (index + 1)} style={{ paddingRight: "15px" }}>
                    <FontAwesomeIcon icon={item} />
                  </li>
                </Link>
              );
            })}
          </div>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
