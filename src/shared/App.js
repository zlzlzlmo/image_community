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

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/login" component={Login}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/postDetail" component={PostDetail}></Route>
        <Route path="/postWrite" component={PostWrite}></Route>
        <Route exact path="/" component={PostList}></Route>
      </ConnectedRouter>
    </>
  );
}

export default App;
