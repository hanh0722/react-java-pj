import React, { useRef } from "react";
import Editor from "../Product/Editor/Editor";
import Input from "../../SignInAsset/Input/Input";
import styles from "../../SignInAsset/LoginForm/Form.module.scss";
import classes from "./Blog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { checkInputIsEmpty } from "../../../util";
import DropzoneUpload from "../../DropzoneUpload/DropzoneUpload";
const Blog = ({
  setGetValueEditor,
  setTitleHandler,
  setDescriptionHandler,
  getFileOfDropzone,
  setImageIsLoading
}) => {
  const editorRef = useRef();
  const setValueEditorHandler = (htmlContent) => {
    if (typeof setGetValueEditor === "function") {
      setGetValueEditor(htmlContent);
    }
  };
  return (
    <div className={`${styles.form} ${classes.container}`}>
      <Input
        functionCondition={(value) => checkInputIsEmpty(value)}
        input={{
          type: "text",
          autoComplete: "off",
          required: true,
          placeholder: "Blog Title",
          id: "Title",
          onChange: setTitleHandler,
        }}
        error="Blog must have title"
        label="Title"
      >
        <FontAwesomeIcon icon={faHeading} />
      </Input>
      <Input
        functionCondition={(value) => checkInputIsEmpty(value)}
        input={{
          type: "text",
          autoComplete: "off",
          required: true,
          placeholder: "Short Description",
          id: "short_description",
          onChange: setDescriptionHandler,
        }}
        error="Blog must have short description"
        label="Short Description"
      >
        <FontAwesomeIcon icon={faPenAlt} />
      </Input>
      <label onClick={() => editorRef.current.focus()}>Content</label>
      <Editor
        ref={editorRef}
        getValue={setValueEditorHandler}
        setIsLoadingUpload={setImageIsLoading}
        placeholder="Write some awesome content"
      />
      <label className="pt-3">Cover Image (Outside Blog)</label>
      <DropzoneUpload
        maxFiles={1}
        config={{ multiple: false }}
        title="Upload Image for content outside (1 image)"
        getFileOfDrop={getFileOfDropzone}
      />
    </div>
  );
};

export default Blog;
