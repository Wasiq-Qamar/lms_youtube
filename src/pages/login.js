import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import themeObject from "../util/theme";

import { Context as AuthContext } from "../context/AuthContext";

const styles = themeObject;

const Login = ({ classes }) => {
  const { state, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let token = localStorage.getItem("token");

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password });
  };

  return (
    <div className={classes.mainContainer}>
      <Grid className={classes.loginContainer}>
        <Grid item sm>
          <Typography
            variant="h4"
            className={classes.pageTitle}
            color="primary"
          >
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={state.isLoading}
            >
              Login
              {state.isLoading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            {state.errorMessage ? (
              <small className={classes.customError}>
                {state.errorMessage}
              </small>
            ) : null}
            {state.token ? <Redirect to="/dashboard" /> : null}
            <br />
            <small>
              Don't have an account? <Link to="/">Sign Up</Link>
            </small>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Login);
