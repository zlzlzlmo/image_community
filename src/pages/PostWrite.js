import React, { useState, useRef } from "react";
import {
  Container,
  Grid,
  Typography,
  Input,
  Button,
  TextareaAutosize,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Header from "../components/Header";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/module/user";
import Post, { Post1Box } from "../components/Post";

const PostWrite = () => {
  const postImgStyle = {
    width: "100%",
    height: "252px",
    "object-fit": "cover",
  };
  return (
    <>
      <Container>
        <Header></Header>
      </Container>
      <Container>
        <Grid style={{ marginTop: "50px" }}>
          <Typography variant="h4" style={{ fontWeight: 500 }}>
            게시글 작성
          </Typography>
          <Input type="file" fullWidth></Input>
        </Grid>
        <FormControl component="fieldset" style={{ marginTop: "30px" }}>
          <FormLabel component="legend">레이아웃 (택1)</FormLabel>
          <RadioGroup
            aria-label="layout"
            name="layout"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel
              value="post1"
              control={<Radio />}
              label="텍스트 상단 이미지 하단형"
            />
            <FormControlLabel
              value="post2"
              control={<Radio />}
              label="텍스트 오른편 이미지 왼편형"
            />
            <FormControlLabel
              value="post3"
              control={<Radio />}
              label="텍스트 왼편 이미지 오른편형"
            />
          </RadioGroup>
        </FormControl>

        <Grid style={{ margin: "30px 0" }}>
          <Typography variant="h4" style={{ fontWeight: 500 }}>
            미리보기
          </Typography>
          <Post1Box></Post1Box>
        </Grid>
        <Grid>
          <Typography style={{ fontWeight: 500 }}>게시글 내용</Typography>
          <TextareaAutosize
            style={{ resize: "none", width: "100%", height: "200px" }}
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          style={{ marginTop: "20px" }}
        >
          게시글 작성
        </Button>
      </Container>
    </>
  );
};

export default PostWrite;
