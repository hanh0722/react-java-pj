import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import styles from "./Form.module.scss";
import Input from "../../../SignInAsset/Input/Input";
import classes from "../../../SignInAsset/LoginForm/Form.module.scss";
import Editor from "../Editor/Editor";
import DropzoneUpload from "../../../DropzoneUpload/DropzoneUpload";
import { useDispatch } from "react-redux";
import {
  uploadActions,
  TYPE_DISPATCH,
} from "../../../store/UploadProduct/UploadProduct";
const Form = ({ setFileHandler, setIsLoadingUpload }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const focusEditorHandler = () => {
    editorRef.current.focus();
  };
  const getValueOfEditor = (data) => {
    dispatch(
      uploadActions.changeValueOfProduct({
        type: TYPE_DISPATCH.DESCRIPTION,
        value: data,
      })
    );
  };
  return (
    <div className={`${classes.form} w-100 ${styles.container}`}>
      <Input
        functionCondition={(value) => value.trim().length > 0}
        input={{
          type: "text",
          autoComplete: "off",
          id: "Title",
          placeholder: "Add Title For Product",
          onChange: (event) =>
            dispatch(
              uploadActions.changeValueOfProduct({
                type: TYPE_DISPATCH.TITLE,
                value: event.target.value,
              })
            ),
        }}
        label="Title"
        error="Title must be filled"
      >
        <FontAwesomeIcon icon={faSignature} />
      </Input>
      <label onClick={focusEditorHandler}>Description</label>
      <Editor
        dispatch={dispatch}
        ref={editorRef}
        focusEditorHandler={focusEditorHandler}
        getValue={getValueOfEditor}
        setIsLoadingUpload={setIsLoadingUpload}
      />
      <label className="pt-3">Upload Image</label>
      <DropzoneUpload getFileOfDrop={setFileHandler} />
    </div>
  );
};

export default React.memo(Form);
