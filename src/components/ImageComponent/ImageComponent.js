import React from "react";
import { SERVER } from "../config/ServerRoute/ServerRoute";

const Image = (props) => {
  return (
    <img
      className={props.className}
      src={`${SERVER}/image/${props.src}`}
      {...props.options}
      alt=""
    />
  );
};

export default Image;
