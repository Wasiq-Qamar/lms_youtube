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
import AddClass from "../components/AddClass";
import EditClass from "../components/EditClass";
import StyledTableCell from "../components/StyledTableCell";
import StyledTableRow from "../components/StyledTableRow";

import { Context as ClassContext } from "../context/ClassContext";
import { Context as AuthContext } from "../context/AuthContext";

const styles = themeObject;

const Class = ({ classes }) => {
  const {
    state: { alert, classListing, isLoading },
    clearAlert,
    fetchClasses,
    deleteClass,
  } = useContext(ClassContext);
  const {
    state: { usersListing },
    fetchUsers,
  } = useContext(AuthContext);

  let teachers = usersListing.filter((user) => user.userType === "teacher");

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  if (!token) {
    return <Redirect to="/" />;
  }

  const handleDelete = (id) => {
    deleteClass({ id });
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
            Welcome to Classes
            <AddClass teachers={teachers} />
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
                  <StyledTableCell align="right">Class Code</StyledTableCell>
                  <StyledTableCell align="right">Class Name</StyledTableCell>
                  <StyledTableCell align="right">
                    Assigned Teacher
                  </StyledTableCell>
                  <StyledTableCell align="right">Subject</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classListing.map((item, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.classCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.className}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.teacherId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.subject}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        <EditClass
                          classNames={item.className}
                          classCodes={item.classCode}
                          subjects={item.subject}
                          id={item._id}
                        />
                        <ToolTip title="Delete Class" placement="top">
                          <IconButton onClick={() => handleDelete(item._id)}>
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

export default withStyles(styles)(Class);
