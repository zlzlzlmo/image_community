import React, { useState, useRef } from "react";
import { Container, Grid, Typography, Input, Button } from "@material-ui/core";
import Header from "../components/Header";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/module/user";

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [is_vacant, setIsVacant] = React.useState(false);
  const history = useHistory();
  console.log("cookIeIslLogin : ", getCookie("is_login"));

  const is_login = getCookie("is_login");

  if (is_login === "success") {
    history.push("/");
  }
  React.useEffect(() => {
    if (id !== "" && pwd !== "") {
      setIsVacant(true);
    } else {
      setIsVacant(false);
    }
  }, [id, pwd]);
  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (id === "" || pwd === "") {
      alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }
    setId("");
    setPwd("");
    dispatch(userActions.loginFB(id, pwd));
  };
  return (
    <Container>
      <Header></Header>
      <Grid style={{ marginTop: "50px" }}>
        <Typography variant="h4" style={{ fontWeight: 500 }}>
          로그인
        </Typography>
      </Grid>
      <Grid style={{ marginTop: "30px" }}>
        <Typography>아이디</Typography>
        <Input
          onChange={changeId}
          fullWidth
          placeholder="아이디를 입력하세요"
          value={id}
        ></Input>
      </Grid>

      <Grid style={{ marginTop: "30px" }}>
        <Typography>비밀번호</Typography>
        <Input
          onChange={changePwd}
          fullWidth
          placeholder="비밀번호를 입력하세요"
          value={pwd}
        ></Input>
      </Grid>

      {is_vacant === true ? (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            login();
          }}
        >
          로그인
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          style={{ marginTop: "20px" }}
          disabled
          onClick={() => {
            login();
          }}
        >
          로그인
        </Button>
      )}
    </Container>
  );
};

export default Login;
