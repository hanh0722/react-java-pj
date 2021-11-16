import React, { useState, forwardRef, useMemo, useCallback } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, {
  formats,
  undoChange,
  redoChange,
  uploadFile,
} from "./QuillToolbar";
import turnImageToBase64 from "../../../../util/base64-image";
import "react-quill/dist/quill.snow.css";
const Editor = forwardRef(({ focusEditorHandler, getValue, setIsLoadingUpload, placeholder }, ref) => {
  const [value, setValue] = useState("");
  const getValueFromEditor = (content, delta, source, editor) => {
    setValue(content);
    getValue(editor.getHTML());
  };
  const imageHandler = useCallback(function () {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async function () {
      const file = input.files[0];
      const range = this.quill.getSelection();
      const urlBase64 = await turnImageToBase64(file);
      this.quill.insertEmbed(range.index, "image", urlBase64);
      this.quill.setSelection(range.index + 1);
      // temporary image then change the url after done from server => don't need user to wait for it
      const link = await uploadFile(file, setIsLoadingUpload);
      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here.
      this.quill.deleteText(range.index, 1);
      this.quill.insertEmbed(range.index, "image", link);
    }.bind(this); // react thing
  }, [setIsLoadingUpload]);
  // Modules object for setting up the Quill editor
  const getModules = useMemo(() => {
    return {
      toolbar: {
        container: ".toolbar",
        handlers: {
          undo: undoChange,
          redo: redoChange,
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    };
  }, [imageHandler]);
  return (
    <>
      <QuillToolbar />
      <ReactQuill
        ref={ref}
        className="editor"
        theme="snow"
        value={value}
        onChange={getValueFromEditor}
        modules={getModules}
        formats={formats}
        placeholder={placeholder || "Add description for product"}
        onFocus={focusEditorHandler}
      />
    </>
  );
});

export default Editor;
