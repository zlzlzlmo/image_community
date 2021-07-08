import "./App.css";
import React from "react";
import { Container } from "@material-ui/core";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import { BrowserRouter, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import PostWrite from "../pages/PostWrite";
import PostUpdate from "../pages/PostUpdate";

import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import { actionCreators as userActions } from "../redux/module/user";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/login" component={Login}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/postDetail/:id" component={PostDetail}></Route>
        <Route path="/postWrite" component={PostWrite}></Route>
        <Route path="/PostUpdate/:id" component={PostUpdate}></Route>

        <Route exact path="/" component={PostList}></Route>
      </ConnectedRouter>
    </>
  );
}

export default App;
