import React from "react";
import SuccessIcon from "../components/UI/SuccessIcon/SuccessIcon";
import { Button } from "@material-ui/core";
import { HOME_PAGE } from "../components/link/link";
import { Link } from "react-router-dom";
const SuccessChangePassword = () => {
  return (
    <>
      <SuccessIcon />
      <div className="text-center" style={{ lineHeight: "35px" }}>
        <p>You changed password successfully</p>
        <Link to={HOME_PAGE}>
          <Button className="button mt-4" style={{ padding: "6px 16px" }}>
            Back to home page
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SuccessChangePassword;
