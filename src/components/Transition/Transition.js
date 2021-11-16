import React from "react";
import { CSSTransition } from "react-transition-group";

const Transition = ({ children, options }) => {
  return <CSSTransition {...options}>{children}</CSSTransition>;
};

export default Transition;
