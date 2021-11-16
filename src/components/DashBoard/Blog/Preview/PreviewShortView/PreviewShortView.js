import React from "react";
import SingleBlog from "../../../../Blog/SingleBlog/SingleBlog";
import ImageDefault from "../../../../../image/thumbnail-default.jpeg";
import nonAccentVietnamese from "../../../../removeUnicode/removeUnicode";
import styles from "./PreviewShortView.module.scss";

const PreviewShortView = ({ dataPreview }) => {
  return (
    <>
    <h5 className={`text-center ${styles.title}`}>Preview Outside Screen</h5>
      <SingleBlog
        imageUrl={
          dataPreview.images.length > 0
            ? URL.createObjectURL(dataPreview.images[0])
            : ImageDefault
        }
        preview
        description={dataPreview.description}
        url={nonAccentVietnamese(dataPreview.title)}
        className={styles.preview}
      />
    </>
  );
};

export default PreviewShortView;
