import React from "react";
import HtmlParser from "react-html-parser";
const StringToHTML = ({ className, stringHTML }) => {
  return <div className={className}>{HtmlParser(stringHTML)}</div>;
};

export default StringToHTML;
