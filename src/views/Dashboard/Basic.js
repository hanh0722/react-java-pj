import React from "react";
import Welcome from "../../components/DashBoard/Basic/Welcome/Welcome";
import Container from "../../components/DashBoard/layout/Container";
import Grid from "../../components/DashBoard/UI/Grid/Grid";
import { useSelector } from "react-redux";
import SwiperBlog from "../../components/DashBoard/Basic/SwiperBlog/SwiperBlog";
const Basic = () => {
    const {user, isLoading} = useSelector(state => state.user);
  return (
    <Container>
      <Grid>
        <Welcome user={user} isLoading={isLoading}/>
        <SwiperBlog/>
      </Grid>
    </Container>
  );
};

export default Basic;
