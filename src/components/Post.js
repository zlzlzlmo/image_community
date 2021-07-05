import React from "react";
import {
  Container,
  Grid,
  Typography,
  Input,
  Button,
  Avatar,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
const Post = (props) => {
  console.log("postProps : ", props);
  const { contents, image_url, insert_dt, user_info, like_cnt, type } = props;
  const { user_profile, user_name } = user_info;

  const userProfile =
    user_profile === "undefined" ? "/static/images/avatar/1.jpg" : user_profile;

  return (
    <>
      <Container
        style={{ borderTop: "1px solid lightgray", marginTop: "30px" }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ margin: "10px 0" }}
        >
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="Remy Sharp" src={userProfile} />
            <Typography style={{ marginLeft: "10px" }}>{user_name}</Typography>
          </Grid>
          <Grid style={{ display: "flex" }} direction="row" alignItems="center">
            <Typography>19시간전</Typography>
            <Button variant="outlined" style={{ marginLeft: "20px" }}>
              수정
            </Button>
          </Grid>
        </Grid>
      </Container>

      {(function () {
        if (type === "post1")
          return (
            <Post1Box
              image_url={image_url}
              contents={contents}
              like_cnt={like_cnt}
            ></Post1Box>
          );
        if (type === "post2")
          return (
            <Post2Box
              image_url={image_url}
              contents={contents}
              like_cnt={like_cnt}
            ></Post2Box>
          );
        if (type === "post3")
          return (
            <Post3Box
              image_url={image_url}
              contents={contents}
              like_cnt={like_cnt}
            ></Post3Box>
          );
      })()}
    </>
  );
};

export const Post1Box = ({ contents, image_url, like_cnt }) => {
  const postImgStyle = {
    width: "100%",
    height: "252px",
    "object-fit": "cover",
  };

  const likeCnt = like_cnt === undefined ? 0 : like_cnt;
  const content = contents === undefined ? "텍스트를 입력해주세요" : contents;

  return (
    <>
      <Container>
        <Grid style={{ margin: "30px 0 10px 0" }}>{content}</Grid>
      </Container>
      <Grid>
        <img src={image_url} style={postImgStyle}></img>
      </Grid>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Typography>좋아요 {likeCnt}개</Typography>

          <FavoriteBorderIcon></FavoriteBorderIcon>
        </Grid>
      </Container>
    </>
  );
};

export const Post2Box = ({ contents, image_url, like_cnt }) => {
  const postImgStyle = {
    width: "100%",
    height: "252px",
    "object-fit": "cover",
  };

  const likeCnt = like_cnt === undefined ? 0 : like_cnt;
  const content = contents === undefined ? "텍스트를 입력해주세요" : contents;
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ margin: "10px 0" }}
      >
        <Grid style={{ width: "50%" }}>
          <img src={image_url} style={postImgStyle}></img>
        </Grid>
        <Grid
          style={{
            margin: "30px 0 10px 0",
            padding: "0 20px",
            width: "50%",
            boxSizing: "border-box",
          }}
        >
          {content}
        </Grid>
      </Grid>

      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Typography>좋아요 {likeCnt}개</Typography>

          <FavoriteBorderIcon></FavoriteBorderIcon>
        </Grid>
      </Container>
    </>
  );
};

export const Post3Box = ({ contents, image_url, like_cnt }) => {
  const postImgStyle = {
    width: "100%",
    height: "252px",
    "object-fit": "cover",
  };

  const content = contents === undefined ? "텍스트를 입력해주세요" : contents;

  const likeCnt = like_cnt === undefined ? 0 : like_cnt;

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ margin: "10px 0" }}
      >
        <Grid
          style={{
            margin: "30px 0 10px 0",
            padding: "0 20px",
            width: "50%",
            boxSizing: "border-box",
          }}
        >
          {content}
        </Grid>
        <Grid style={{ width: "50%" }}>
          <img src={image_url} style={postImgStyle}></img>
        </Grid>
      </Grid>

      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Typography>좋아요 {likeCnt}개</Typography>

          <FavoriteBorderIcon></FavoriteBorderIcon>
        </Grid>
      </Container>
    </>
  );
};

export default Post;
