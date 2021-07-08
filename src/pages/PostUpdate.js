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
import image, { actionCreators as imageActions } from "../redux/module/image";

import { actionCreators as userActions } from "../redux/module/user";
import Post, { Post1Box, Post2Box, Post3Box } from "../components/Post";
import { actionCreators as postActions } from "../redux/module/post";
import { storage } from "../shared/firebase";

const PostUpdate = (props) => {
  console.log("updateProps : ", props);
  const {
    contents,
    image_url,
    like_cnt,
    type,
    id,
  } = props.location.state.post_info;
  const dispatch = useDispatch();
  const fileInput = React.useRef();

  // const [postType, setPostType] = React.useState("post1");
  const [radioValue, setRadioValue] = React.useState(type);
  const [textContent, setTextContent] = React.useState(contents);
  const [uploadFile, setUploadFile] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [hideUploadBtn, setHideUploadBtn] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(image_url);
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
      setPreviewUrl(reader.result);
      setUploadedFile(file);
    };
    setHideUploadBtn(true);
  };

  const editPost = () => {
    dispatch(
      postActions.editPostFB(id, { contents: textContent, type: radioValue })
    );
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
            게시글 작성
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
              업로드
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <FormControl component="fieldset" style={{ marginTop: "30px" }}>
          <FormLabel component="legend">레이아웃 (택1)</FormLabel>
          <RadioGroup
            aria-label="layout"
            name="layout"
            value={radioValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="post1"
              control={<Radio selected />}
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
          {(function () {
            if (radioValue === "post1") {
              return (
                <Post1Box
                  like_cnt={like_cnt}
                  contents={textContent}
                  image_url={
                    previewUrl
                      ? previewUrl
                      : "http://via.placeholder.com/400x300"
                  }
                ></Post1Box>
              );
            } else if (radioValue === "post2") {
              return (
                <Post2Box
                  like_cnt={like_cnt}
                  contents={textContent}
                  image_url={
                    previewUrl
                      ? previewUrl
                      : "http://via.placeholder.com/400x300"
                  }
                ></Post2Box>
              );
            } else if (radioValue === "post3") {
              return (
                <Post3Box
                  like_cnt={like_cnt}
                  contents={textContent}
                  image_url={
                    previewUrl
                      ? previewUrl
                      : "http://via.placeholder.com/400x300"
                  }
                ></Post3Box>
              );
            }
          })()}
        </Grid>
        <Grid>
          <Typography style={{ fontWeight: 500 }}>게시글 내용</Typography>
          <TextareaAutosize
            style={{ resize: "none", width: "100%", height: "200px" }}
            onChange={handleTextArea}
            defaultValue={contents}
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            editPost();
          }}
        >
          게시글 수정
        </Button>
      </Container>
    </>
  );
};

export default PostUpdate;
