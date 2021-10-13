import React, { useContext, Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import themeObject from "../util/theme";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToolTip from "@material-ui/core/ToolTip";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";

import { Context as AuthContext } from "../context/AuthContext";

const styles = themeObject;

const AddUser = ({ classes }) => {
  const { state, createUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      profileImage: "",
    });
    setOpen(false);
  };

  const userTypes = [
    {
      value: "student",
      label: "Student",
    },
    {
      value: "teacher",
      label: "Teacher",
    },
    {
      value: "head",
      label: "Head",
    },
  ];

  return (
    <Fragment>
      <ToolTip title="Add a User" placement="top">
        <IconButton onClick={() => setOpen(!open)}>
          <AddCircleIcon color="primary" style={{ fontSize: 40 }} />
        </IconButton>
      </ToolTip>

      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <ToolTip title="Close" placement="top">
          <IconButton
            onClick={() => setOpen(!open)}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </ToolTip>
        <DialogTitle> New User </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              name="name"
              type="text"
              label="Name"
              placeholder="Enter User Name"
              className={classes.textField}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              value={name}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              placeholder="Enter User Email"
              className={classes.textField}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              value={email}
            />
            <TextField
              name="userType"
              select
              label="User Type"
              value={userType}
              placeholder="Enter User Type"
              className={classes.textField}
              onChange={(event) => setUserType(event.target.value)}
              fullWidth
            >
              {userTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="phone"
              type="text"
              label="Phone Number"
              placeholder="Enter Phone Number"
              className={classes.textField}
              onChange={(event) => setPhoneNumber(event.target.value)}
              fullWidth
              value={phoneNumber}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(AddUser);
