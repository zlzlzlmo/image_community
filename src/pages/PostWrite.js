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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as imageActions } from "../redux/module/image";

import { actionCreators as userActions } from "../redux/module/user";
import Post, { Post1Box, Post2Box, Post3Box } from "../components/Post";
import { actionCreators as postActions } from "../redux/module/post";
import { storage } from "../shared/firebase";

const PostWrite = () => {
  const postImgStyle = {
    width: "100%",
    height: "252px",
    "object-fit": "cover",
  };

  const dispatch = useDispatch();
  const fileInput = React.useRef();

  // const [postType, setPostType] = React.useState("post1");
  const [radioValue, setRadioValue] = React.useState("post1");
  const [textContent, setTextContent] = React.useState(null);
  const [uploadFile, setUploadFile] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [hideUploadBtn, setHideUploadBtn] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);

  const handleChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleTextArea = (e) => {
    setTextContent(e.target.value);
    console.log("textContent : ", textContent);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);
    setUploadFile(true);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      setUploadedFile(file);
    };
    setHideUploadBtn(true);
  };

  const addPost = () => {
    if (!uploadFile) {
      alert("????????? ???????????? ????????????.");
      return;
    }
    dispatch(postActions.addPostFB(textContent, radioValue));
  };

  const uploadFB = () => {
    dispatch(imageActions.uploadImageFB(uploadedFile));
  };
  return (
    <>
      <Container>
        <Header></Header>
      </Container>
      <Container>
        <Grid style={{ marginTop: "50px" }}>
          <Typography variant="h4" style={{ fontWeight: 500 }}>
            ????????? ??????
          </Typography>
          <Input
            type="file"
            fullWidth
            ref={fileInput}
            onChange={selectFile}
          ></Input>
          {hideUploadBtn ? (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              style={{ marginTop: "20px" }}
              onClick={() => {
                uploadFB();
              }}
            >
              ?????????
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <FormControl component="fieldset" style={{ marginTop: "30px" }}>
          <FormLabel component="legend">???????????? (???1)</FormLabel>
          <RadioGroup
            aria-label="layout"
            name="layout"
            value={radioValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="post1"
              control={<Radio selected />}
              label="????????? ?????? ????????? ?????????"
            />
            <FormControlLabel
              value="post2"
              control={<Radio />}
              label="????????? ????????? ????????? ?????????"
            />
            <FormControlLabel
              value="post3"
              control={<Radio />}
              label="????????? ?????? ????????? ????????????"
            />
          </RadioGroup>
        </FormControl>

        <Grid style={{ margin: "30px 0" }}>
          <Typography variant="h4" style={{ fontWeight: 500 }}>
            ????????????
          </Typography>
          {(function () {
            if (radioValue === "post1") {
              return (
                <Post1Box
                  contents={textContent}
                  image_url={
                    preview ? preview : "http://via.placeholder.com/400x300"
                  }
                ></Post1Box>
              );
            } else if (radioValue === "post2") {
              return (
                <Post2Box
                  contents={textContent}
                  image_url={
                    preview ? preview : "http://via.placeholder.com/400x300"
                  }
                ></Post2Box>
              );
            } else if (radioValue === "post3") {
              return (
                <Post3Box
                  contents={textContent}
                  image_url={
                    preview ? preview : "http://via.placeholder.com/400x300"
                  }
                ></Post3Box>
              );
            }
          })()}
        </Grid>
        <Grid>
          <Typography style={{ fontWeight: 500 }}>????????? ??????</Typography>
          <TextareaAutosize
            style={{ resize: "none", width: "100%", height: "200px" }}
            onChange={handleTextArea}
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            addPost();
          }}
        >
          ????????? ??????
        </Button>
      </Container>
    </>
  );
};

export default PostWrite;
