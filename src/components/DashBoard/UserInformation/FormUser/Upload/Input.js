import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input onChange={props.onChange} ref={ref} style={{ display: "none" }} accept="image/*" type="file" />
  );
});

export default Input;
