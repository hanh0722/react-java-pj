import React from "react";
import styles from "./CategoriesBlog.module.scss";
import { Link } from "react-router-dom";
import nonAccentVietnamese from "../../removeUnicode/removeUnicode";
import { BLOG_PAGE } from "../../link/link";
const CategoriesBlog = ({ category }) => {
  return (
    <div className={styles.category}>
      <h5>Categories</h5>
      <ul>
        <li>
          <Link to={`${BLOG_PAGE}/category?type=$${nonAccentVietnamese(category)}`}>
            {category}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoriesBlog;
