import p1 from "../../../../image/1_1170x.png";
import styles from "./SlideBlog.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const SlideBlog = () => {
  return (
    <div className={styles.slide}>
      <Link to="/">
        <div className={styles.image}>
          <img src={p1} alt="" />
        </div>
      </Link>
      <div className={styles.content}>
        <Link className={styles.link} to="/">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, nihil!
        </Link>
        <Link to="/">
          <Button className={styles.button} variant="contained">
            <span>Read More</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SlideBlog;
