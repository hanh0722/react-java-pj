import React from "react";
import Content from "../layout/Content/Content";
import BlockService from "./BlockService/BlockService";
import styles from "./Service.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree, faWind } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
const Service = () => {
  return (
    <Content>
      <div className={`text text-center ${styles["row__bg"]}`}>
        <div data-aos='fade-up' className={styles.text}>
          <h4>Over 10 years with tree care services in the US</h4>
          <h2>Experience Our Services</h2>
        </div>
      </div>
      <div className={`d-flex justify-content-evenly ${styles.blocks}`}>
        <BlockService data-aos='zoom-in-up'>
          <div className={styles["block-introduction"]}>
            <h5>Basic</h5>
            <FontAwesomeIcon icon={faTree} />
            <p>$49 per month</p>
            <ul className={styles.pros}>
              <li>Provide fertilizer, pesticides</li>
              <li>Supported with experts</li>
              <li>3 times per month</li>
              <li>2 Trees per month</li>
              <li>Support Mon to Fri</li>
            </ul>
            <ul className={styles.cons}>
              <li>including decorations</li>
              <li>support checking every weeks</li>
              <li>rebuild tree's form</li>
              <li>split tree</li>
            </ul>
            <Button variant='contained'>Upgrade</Button>
          </div>
        </BlockService>
        <BlockService data-aos='zoom-in-up'>
          <div className={styles["block-introduction"]}>
            <h5>Advanced</h5>
            <FontAwesomeIcon icon={faWind} />
            <p>$69 per month</p>
            <ul className={styles.pros}>
              <li>Provide fertilizer, pesticides, form</li>
              <li>Support 24/7</li>
              <li>4 Trees per month</li>
              <li>5 times per month</li>
              <li>Include books, access courses</li>
              <li>Save 12%</li>
              <li>Tree decoration</li>
              <li>Split tree</li>
            </ul>
            <Button variant='contained'>Upgrade!</Button>
          </div>
        </BlockService>
      </div>
    </Content>
  );
};

export default Service;
