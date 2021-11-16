import React from "react";
import HeaderPage from "../../HeaderPage/HeaderPage";
import { useRouteMatch } from "react-router-dom";
const Header = () => {
  const route = useRouteMatch();
  const pathLinks = [
    {
      name: 'Blog',
      link: route.path
    }
  ]
  return (
    <>
      <HeaderPage title='Blog' paths={pathLinks}/>
    </>
  );
};

export default Header;
