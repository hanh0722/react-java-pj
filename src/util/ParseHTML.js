import React from "react";
import HtmlParser from "react-html-parser";

const ParseHTML = ({string}) => {
    return(
        <>
            {HtmlParser(string)}
        </>
    )
}

export default ParseHTML;