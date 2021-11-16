import React from "react";
import ContainerEmpty from "../../layout/container-empty/ContainerEmpty";
import Spinner from '../../Loading/Spinner/Spinner';
const LoadingTime = (props) => {
  return (
    <ContainerEmpty className={`d-flex justify-content-center align-items-center ${props.className}`}>
      <Spinner />
    </ContainerEmpty>
  );
};

export default LoadingTime;
