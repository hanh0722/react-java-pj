import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Preview.module.scss";
import DetailBlog from "../../../../views/DetailBlog";
import nonAccentVietnamese from "../../../removeUnicode/removeUnicode";
import { BLOG_PAGE } from "../../../link/link";
import { checkInputIsEmpty } from "../../../../util";
import { Button } from "@material-ui/core";
import emptyImage from '../../../../image/illustration_empty_content.svg';
import PreviewShortView from "./PreviewShortView/PreviewShortView";
const Preview = ({ data }) => {
  return (
    <div className={styles.preview}>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.bar}`}
      >
        <p>Preview Post</p>
        <Button onClick={data.removePreview} variant="contained" className={styles.button}>
          Cancel
        </Button>
      </div>
      <>
        {!checkInputIsEmpty(data.title) &&
        !checkInputIsEmpty(data.valueEditor) &&
        !checkInputIsEmpty(data.description) &&
        data.images.length === 0 &&
        !data.category ? (
          <div className={`d-flex justify-content-center align-items-center flex-column ${styles.image}`}>
            <img src={emptyImage} alt=""/>
            <p>Empty Content</p>
          </div>
        ) : (
          <Container>
            <DetailBlog
              previewMode
              title={data.title}
              paths={[
                {
                  name: "Blog",
                  link: BLOG_PAGE,
                },
                {
                  name: data.title,
                  link: nonAccentVietnamese(data.title),
                },
              ]}
              category={data.category}
              user={data.user}
              timeCreated={new Date().toLocaleDateString()}
              content_blog={data.valueEditor}
            >
              <PreviewShortView dataPreview={{
                description: data?.description,
                images: data?.images,
                title: data.title
              }}/>
            </DetailBlog>
          </Container>
        )}
      </>
    </div>
  );
};

export default Preview;
