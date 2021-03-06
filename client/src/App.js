import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import NewStory from "./components/WriteBlog";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import Stories from "./components/Stories";
import PostsList from "./components/PostsList";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/login";
import Register from "./components/register";
import ForgetPassword from "./components/forgetPassword";
import { AuthContext } from "./components/Context";
import PostBody from "./components/PostBody";
import PasswordReset from "./components/PasswordReset";
import io from "socket.io-client";
import { getNotifies } from "./actions/notify";
import { GLOBALTYPES } from "./actions/globalTypes";
import SocketClient from "./SocketClient";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const { ─▒sAuthenticated } = useContext(AuthContext);

  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io();

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (─▒sAuthenticated) {
      dispatch(getNotifies());
    }
  }, [dispatch, ─▒sAuthenticated]);

  const classes = useStyle();

  return (
    <>
      <CssBaseline />

      <Container maxWidth="lg">
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              {─▒sAuthenticated && <SocketClient />}

              <Routes>
                <Route path="/" element={<PostsList />} />
                <Route path="/:tag" element={<PostsList />} />
                <Route path="verify" element={<Profile />} />

                <Route path="User/Profile" element={<Profile />} />
                <Route path="/New-story" element={<NewStory />} />
                <Route path="/User/Stats" element={<Stats />} />
                <Route path="/User/Stories" element={<Stories />} />
                <Route
                  path="/login"
                  element={─▒sAuthenticated ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/auth/verify/:activation_token"
                  element={─▒sAuthenticated ? <Navigate to="/" /> : <Register />}
                />
                <Route
                  path="/register"
                  element={─▒sAuthenticated ? <Navigate to="/" /> : <Register />}
                />
                <Route
                  path="/forget-password"
                  element={
                    ─▒sAuthenticated ? <Navigate to="/" /> : <ForgetPassword />
                  }
                />
                <Route
                  path="/auth/resetPassword/:activatTokenForPass"
                  element={
                    ─▒sAuthenticated ? <Navigate to="/" /> : <PasswordReset />
                  }
                />
                <Route path="/Post/:id" element={<PostBody />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
