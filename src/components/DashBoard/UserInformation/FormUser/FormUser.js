import React, { useEffect, useRef, useState } from "react";
import BoxContainer from "../../UI/BoxContainer/BoxContainer";
import ImageUser from "./Upload/ImageUser";
import Input from "./Upload/Input";
import styles from "./FormUser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../../hook/use-axios";
import { uploadSingleImageApi } from "../../../../config/url";
import { key_multer } from "../../../../util/key-server";
import { useDispatch } from "react-redux";
import { NotifyActions } from "../../../store/NotifyAfterLogin/NotifyAfterLogin";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
const FormUser = ({ user, setAvatar, avatar }) => {
  const [url, setUrl] = useState(avatar);
  const dispatch = useDispatch();
  const { isLoading, error, data, fetchDataFromServer, percentLoading } =
    useAxios();
  const inputRef = useRef();
  const inputUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append(key_multer, file);
    setUrl(URL.createObjectURL(file));
    // temporary URL
    fetchDataFromServer({
      url: uploadSingleImageApi,
      method: "POST",
      data: formData,
    });
  };
  const accessFileUpload = () => {
    inputRef.current.click();
  };
  useEffect(() => {
    if (user) {
      const avatar = user.avatar;
      if (avatar) {
        setUrl(avatar);
      }
    }
    if (!isLoading && !error && data) {
      setUrl(data.data.url);
      setAvatar(data.data.url);
    }
    if (!isLoading && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Cannot upload file",
          code: error.code || 500,
        })
      );
    }
  }, [isLoading, error, dispatch, data, setAvatar, user]);
  return (
    <BoxContainer
      className={`d-flex flex-column justify-content-center align-items-center ${styles.container}`}
    >
      <div className={styles.image}>
        {!user && (
          <Skeleton imageClassName="w-100 h-100 rounded-circle" src />
        )}
        {user && (
          <ImageUser
            src={url}
            isLoading={isLoading}
            percentUpload={percentLoading}
          />
        )}
        {!isLoading && (
          <div
            onClick={accessFileUpload}
            className={`${styles.upload} d-flex justify-content-center align-items-center flex-column`}
          >
            <FontAwesomeIcon icon={faCameraRetro} />
            <span>Update photo</span>
          </div>
        )}
      </div>
      <div className={styles.infor}>
        <p>
          Allowed <sup>*</sup> jpeg, <sup>*</sup> jpg, <sup>*</sup>png,{" "}
          <sup>*</sup>heic
        </p>
      </div>
      <Input onChange={inputUpload} ref={inputRef} />
    </BoxContainer>
  );
};

export default FormUser;
