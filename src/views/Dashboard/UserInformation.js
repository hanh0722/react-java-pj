import React, { useEffect, useMemo } from "react";
import Container from "../../components/DashBoard/layout/Container";
import Navigation from "../../components/DashBoard/UserInformation/Navigation";
import FormUploadUser from "../../components/DashBoard/UserInformation/FormUploadUser/FormUploadUser";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { navigationActions } from "../../components/store/NavigationDash/navigation-dash";
import Billing from "../../components/DashBoard/Billing/Billing";
import ChangePasswordUser from "../../components/DashBoard/ChangePasswordUser/ChangePasswordUser";
const UserInformation = () => {
  const index = useSelector((state) => state.nav.index);
  const dispatch = useDispatch();
  const location = useLocation();
  const getOptionsURL = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const option = params.get('option');
    return option;
  }, [location.search]);
  useEffect(() => {
    const option = getOptionsURL;
    if(option === "general" || !option){
      dispatch(navigationActions.changeNavigation(0));
    } else if(option === "billing"){
      dispatch(navigationActions.changeNavigation(1));
    } else {
      dispatch(navigationActions.changeNavigation(2));
    }
  }, [getOptionsURL, dispatch]);
  return (
    <Container>
      <Navigation navIndex={index} />
      {index === 0 && <FormUploadUser />}
      {index === 1 && <Billing/>}
      {index === 2 && <ChangePasswordUser/>}
    </Container>
  );
};

export default UserInformation;
