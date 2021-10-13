import React, { Fragment, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { Context as AuthContext } from "../context/AuthContext";

const styles = {
  Header: {
    fontWeight: "bold",
    marginRight: 30,
  },
  image: {
    width: "60px",
    padding: 0,
    marginRight: -18,
  },
  toolbar: {
    minHeight: 70,
    "& svg": {
      color: "#fff",
    },
  },
};

const Navbar = ({ classes }) => {
  let token = localStorage.getItem("token");
  const { signout, clearIsLoading } = useContext(AuthContext);

  const logout = () => {
    clearIsLoading();
    signout();
    return <Redirect to="/" />;
  };

  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" color="inherit" className={classes.Header}>
            Leaning Management System
          </Typography>

          <Fragment>
            <Button color="inherit" component={Link} to="/dashboard">
              Home
            </Button>
            {token ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/">
                Login
              </Button>
            )}
            <Button color="inherit" component={Link} to="/student">
              Student
            </Button>
            <Button color="inherit" component={Link} to="/teacher">
              Teacher
            </Button>
            <Button color="inherit" component={Link} to="/class">
              Class
            </Button>
          </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
