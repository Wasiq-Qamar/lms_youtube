import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ToolTip from "@material-ui/core/ToolTip";
import Alert from "@material-ui/lab/Alert";

import themeObject from "../util/theme";
import EditUser from "../components/EditUser";
import AssignClassStudent from "../components/AssignClassStudent";
import StyledTableCell from "../components/StyledTableCell";
import StyledTableRow from "../components/StyledTableRow";

import { Context as ClassContext } from "../context/ClassContext";
import { Context as AuthContext } from "../context/AuthContext";

const styles = themeObject;

const Student = ({ classes }) => {
  const {
    state: { alert, classListing },
    clearAlert,
    fetchClasses,
    deleteClass,
  } = useContext(ClassContext);
  const {
    state: { usersListing, isLoading },
    fetchUsers,
    deleteUser,
  } = useContext(AuthContext);

  let students = usersListing.filter((user) => user.userType === "student");

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  if (!token) {
    return <Redirect to="/" />;
  }

  const handleDelete = (id) => {
    deleteUser({ id });
  };

  return (
    <div className={classes.container}>
      <Grid item sm>
        <div className={classes.rowContainer}>
          <Typography
            variant="h4"
            className={classes.pageTitle}
            color="primary"
          >
            Student Info
          </Typography>
          <div className={classes.alert}>
            {alert ? (
              <Alert
                variant="filled"
                severity="success"
                onClose={() => {
                  clearAlert();
                }}
              >
                {alert}
              </Alert>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          <div className={classes.container}>
            <CircularProgress className={classes.progress} size={30} />
          </div>
        ) : (
          <TableContainer component={Paper} className={classes.container}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">User Type</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Image</StyledTableCell>
                  <StyledTableCell align="right">
                    Class Assigned
                  </StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((user, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.userType}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.phoneNumber}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <img
                          src={user.profileImage}
                          alt="image"
                          className={classes.image}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {classListing.map((item) => {
                          return item.students.includes(user._id)
                            ? item.className
                            : null;
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <AssignClassStudent studentId={user._id} />
                        <EditUser
                          names={user.name}
                          emails={user.email}
                          phoneNumbers={user.phoneNumber}
                          id={user._id}
                        />
                        <ToolTip title="Delete User" placement="top">
                          <IconButton onClick={() => handleDelete(user._id)}>
                            <DeleteIcon
                              color="primary"
                              style={{ fontSize: 40 }}
                            />
                          </IconButton>
                        </ToolTip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Student);
