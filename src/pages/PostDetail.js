import React from "react";
import { Container, Grid, Typography, Input, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Post from "../components/Post";
const PostDetail = (props) => {
  return (
    <>
      <Container>
        <Header></Header>
      </Container>
      <Grid style={{ position: "relative", paddingBottom: "100px" }}>
        <Post {...props.location.state.p}></Post>
      </Grid>
    </>
  );
};

export default PostDetail;
