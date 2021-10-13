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
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";

import { Context as ClassContext } from "../context/ClassContext";

const styles = themeObject;

const AssignClassTeacher = ({ classes, teacherId }) => {
  const {
    state: { classListing },
    assignClassTeacher,
  } = useContext(ClassContext);
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    assignClassTeacher({
      teacherId,
      classId,
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <ToolTip title="Assign Class" placement="top">
        <IconButton onClick={() => setOpen(!open)}>
          <AssignmentIndIcon color="primary" style={{ fontSize: 40 }} />
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
        <DialogTitle> Assign Class </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              name="class"
              select
              label="Class"
              value={classId}
              placeholder="Assign Class to Teacher"
              className={classes.textField}
              onChange={(event) => setClassId(event.target.value)}
              fullWidth
            >
              {classListing.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.className}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Assign
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(AssignClassTeacher);
