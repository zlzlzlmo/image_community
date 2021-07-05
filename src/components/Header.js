import React, { useState, useEffect } from "react";
import { Grid, Avatar, Button } from "@material-ui/core";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { actionCreators as userActions } from "../redux/module/user";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { apiKey } from "../shared/firebase";

const Header = () => {
  // const [is_login, setIsLogin] = useState(false);
  const history = useHistory();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_login = sessionStorage.getItem(_session_key);

  const dispatch = useDispatch();
  console.log("is_login : ", is_login);
  useEffect(() => {
    let cookie = getCookie("user_id");
  }, []);

  const logOutDeleteCookie = () => {
    dispatch(userActions.logoutFB({}));
  };

  if (is_login) {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Grid>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid>
            <Button variant="outlined" color="primary">
              내정보
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "0 10px" }}
            >
              알림
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                logOutDeleteCookie();
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Grid>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Header;
