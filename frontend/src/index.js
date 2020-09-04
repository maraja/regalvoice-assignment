import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Call from "#root/components/Root/Call";
import Admin from "#root/components/Root/Admin";
import Home from "#root/components/Root/Home";

import Auth from "#root/components/Shared/LoginForm";

import * as theme from "./theme";
import './index.less';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  body {
    font-family: Roboto, sans-serif;
  }
`;

render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/call">
              <Call />
            </Route>
            <Route path="/admin">
              <Auth><Admin /></Auth>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>,
  document.getElementById("app")
);
