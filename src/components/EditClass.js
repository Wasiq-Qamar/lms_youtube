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
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";

import { Context as ClassContext } from "../context/ClassContext";

const styles = themeObject;

const EditClass = ({ classes, classNames, classCodes, subjects, id }) => {
  const { state, editClass } = useContext(ClassContext);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState(classNames || "");
  const [classCode, setClassCode] = useState(classCodes || "");
  const [subject, setSubject] = useState(subjects || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    editClass({
      className: className,
      classCode: classCode,
      subject: subject,
      id: id,
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <ToolTip title="Edit User" placement="top">
        <IconButton onClick={() => setOpen(!open)}>
          <EditIcon color="primary" style={{ fontSize: 40 }} />
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
        <DialogTitle> Edit Class </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              name="classCode"
              type="classCode"
              label="Class Code"
              placeholder="Enter Class Code"
              className={classes.textField}
              onChange={(event) => setClassCode(event.target.value)}
              fullWidth
              value={classCode}
            />
            <TextField
              name="className"
              type="className"
              label="Class Name"
              placeholder="Enter Class Name"
              className={classes.textField}
              onChange={(event) => setClassName(event.target.value)}
              fullWidth
              value={className}
            />
            <TextField
              name="subject"
              type="text"
              label="Subject"
              placeholder="Enter Subject"
              className={classes.textField}
              onChange={(event) => setSubject(event.target.value)}
              fullWidth
              value={subject}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(EditClass);
