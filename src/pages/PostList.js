import React from "react";
import { Container, Grid, Typography, Input, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Post from "../components/Post";

// import Post2 from "../components/Post2";
// import Post3 from "../components/Post3";

import { actionCreators as postActions } from "../redux/module/post";

const PostList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  console.log("post_list :", post_list);
  return (
    <>
      <Container>
        <Header></Header>
      </Container>
      <Grid style={{ position: "relative", paddingBottom: "100px" }}>
        {post_list.map((p, idx) => {
          return (
            <Grid
              onClick={() =>
                history.push({
                  pathname: `/postDetail/${p.id}`,
                  state: { p },
                })
              }
            >
              <Post key={p.id} {...p}></Post>
            </Grid>
          );
          // switch (p.type) {
          //   case "post1":
          //     return <Post1 key={p.id} {...p}></Post1>;
          //   case "post2":
          //     return <Post2 key={p.id} {...p}></Post2>;
          //   case "post3":
          //     return <Post3 key={p.id} {...p}></Post3>;
          // }
        })}
        <AddCircleIcon
          style={{
            fontSize: 60,
            position: "absolute",
            bottom: "0",
            right: "0",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          color="secondary"
          onClick={() => history.push("/postWrite")}
        ></AddCircleIcon>
      </Grid>
    </>
  );
};

export default PostList;
