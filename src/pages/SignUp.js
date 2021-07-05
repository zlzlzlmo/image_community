import React from "react";
import { Container, Grid, Typography, Input, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/module/user";

import Header from "../components/Header";

const SignUp = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState({
    id: "",
    pwd: "",
    pwdCheck: "",
    userName: "",
  });

  const signUp = () => {
    const { id, pwd, pwdCheck, userName } = userInfo;

    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    } else if (userName === "") {
      alert("닉네임을 입력해주세요");
      return;
    } else if (pwd === "") {
      alert("패스워드를 입력해주세요");
      return;
    } else if (pwdCheck === "") {
      alert("비밀번호 확인을 입력해주세요");
      return;
    }

    if (pwd !== pwdCheck) {
      alert("비밀번호와 비밀번호 확인을 확인해주세요");
      return;
    }

    dispatch(userActions.signupFB(id, pwd, userName));
  };

  const handleUserInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    console.log("userInfo : ", userInfo);
  };

  return (
    <Container>
      <Header></Header>
      <Grid style={{ marginTop: "50px" }}>
        <Typography variant="h4" style={{ fontWeight: 500 }}>
          회원가입
        </Typography>
      </Grid>
      <Grid style={{ marginTop: "30px" }}>
        <Typography>아이디</Typography>
        <Input
          name="id"
          fullWidth
          placeholder="아이디를 입력하세요"
          onChange={handleUserInfo}
        ></Input>
      </Grid>

      <Grid style={{ marginTop: "30px" }}>
        <Typography>닉네임</Typography>
        <Input
          name="userName"
          fullWidth
          placeholder="닉네임을 입력하세요"
          onChange={handleUserInfo}
        ></Input>
      </Grid>

      <Grid style={{ marginTop: "30px" }}>
        <Typography>비밀번호</Typography>
        <Input
          name="pwd"
          fullWidth
          placeholder="비밀번호를 입력하세요"
          onChange={handleUserInfo}
        ></Input>
      </Grid>

      <Grid style={{ marginTop: "30px" }}>
        <Typography>비밀번호 확인</Typography>
        <Input
          name="pwdCheck"
          fullWidth
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleUserInfo}
        ></Input>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={() => {
          signUp();
        }}
      >
        회원가입
      </Button>
    </Container>
  );
};

export default SignUp;
