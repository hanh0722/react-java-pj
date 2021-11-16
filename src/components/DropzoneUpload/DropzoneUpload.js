import React, { forwardRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import p1 from "../../image/file-upload.png";
import styles from "./File.module.scss";
import Ripple from "../UI/Ripple/Ripple";
import Transition from "../Transition/Transition";
const DropzoneUpload = forwardRef(({getFileOfDrop, title, maxFiles, config}, ref) => {
  const [imageUpload, setImageUpload] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    maxFiles: maxFiles || 5,
    ...config
  });
  const removeItemHandler = (id) => {
    const filterImageArray = imageUpload.filter((file) => {
      return file.id !== id;
    });
    setImageUpload(filterImageArray);
  };
  useEffect(() => {
    const getImageUploadByLinks = acceptedFiles.map((file, index) => {
      return {
        id: index,
        url: URL.createObjectURL(file)
      }
    })
    if(getFileOfDrop){
      getFileOfDrop(acceptedFiles);
    }
    setImageUpload(getImageUploadByLinks);
  }, [acceptedFiles, getFileOfDrop]);
  return (
    <>
      <Transition
        options={{
          in: imageUpload.length === 0,
          timeout: 750,
          mountOnEnter: true,
          unmountOnExit: true,
          classNames: "scale",
        }}
      >
        <Ripple>
          <section className={styles.container}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()}/>
              <div className={`d-flex align-items-center ${styles.drop}`}>
                <div className={styles.image}>
                  <img src={p1} alt="" />
                </div>
                <div className={styles.content}>
                  <span>{title ? title : 'Drop or Selected file (maximum 5 images)'}</span>
                  <p>Drop files here of click browse thorough your machine</p>
                </div>
              </div>
            </div>
          </section>
        </Ripple>
      </Transition>
      {imageUpload.length > 0 && (
        <div className={styles.preload}>
          {imageUpload.map((image) => {
            return (
              <div
                key={image.id}
                className={`position-relative ${styles["preload-item"]}`}
              >
                <span
                  onClick={() => removeItemHandler(image.id)}
                  className={styles.close}
                >
                  <span />
                  <span />
                </span>
                <img src={image.url} alt="" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
});

export default DropzoneUpload;
