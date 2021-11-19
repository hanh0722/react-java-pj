import React, { forwardRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import p1 from "../../image/file-upload.png";
import styles from "./File.module.scss";
import Ripple from "../UI/Ripple/Ripple";
import Transition from "../Transition/Transition";
import { uploadMultipleImageApi } from "../../config/upload/upload";
import { key_multer } from "../../util/key-server";
import useAxios from "../../hook/use-axios";
import { v4 as uuid } from "uuid";
const DropzoneUpload = forwardRef(
  ({ getFileOfDrop, title, maxFiles, config, setFileIsUploading }, ref) => {
    const [imageUpload, setImageUpload] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      maxFiles: maxFiles || 5,
      ...config,
    });
    const { isLoading, error, data, fetchDataFromServer } = useAxios();
    const removeItemHandler = (id) => {
      const filterImageArray = imageUpload.filter((file) => {
        return file.id !== id;
      });
      if (getFileOfDrop) {
        getFileOfDrop(filterImageArray);
      }
      setImageUpload(filterImageArray);
    };
    useEffect(() => {
      const getImageUploadByLinks = acceptedFiles.map((file, index) => {
        return {
          id: index,
          url: URL.createObjectURL(file),
        };
      });
      if (getFileOfDrop) {
        getFileOfDrop(acceptedFiles);
      }
      setImageUpload(getImageUploadByLinks);
    }, [acceptedFiles, getFileOfDrop]);
    useEffect(() => {
      if (acceptedFiles.length === 0) {
        return;
      }
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append(key_multer, file);
      });
      fetchDataFromServer({
        url: uploadMultipleImageApi,
        data: formData,
        method: "POST",
      });
    }, [acceptedFiles, fetchDataFromServer]);
    useEffect(() => {
      if(isLoading){
        if(setFileIsUploading){
          setFileIsUploading(true);
        }
      }
      if (!isLoading && data) {
        const urls = data.data.urls.map((item) => {
          return {
            url: item,
            id: uuid(),
          };
        });
        if (getFileOfDrop) {
          getFileOfDrop(data.data.urls);
        }
        if(setFileIsUploading){
          setFileIsUploading(false);
        }
        setImageUpload(urls);
      }
    }, [isLoading, data, getFileOfDrop, setFileIsUploading]);
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
                <input {...getInputProps()} />
                <div className={`d-flex align-items-center ${styles.drop}`}>
                  <div className={styles.image}>
                    <img src={p1} alt="" />
                  </div>
                  <div className={styles.content}>
                    <span>
                      {title
                        ? title
                        : "Drop or Selected file (maximum 5 images)"}
                    </span>
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
  }
);

export default DropzoneUpload;
