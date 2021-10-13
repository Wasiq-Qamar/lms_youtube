import React, { useState, Fragment, useContext } from "react";
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
import ImageIcon from "@material-ui/icons/Image";
import Typography from "@material-ui/core/Typography";

import { Context as AuthContext } from "../context/AuthContext";

const styles = themeObject;

const EditUser = ({ classes, names, emails, phoneNumbers, id }) => {
  const { state, editUser, uploadUserImage } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(names || "");
  const [email, setEmail] = useState(emails || "");
  const [phoneNumber, setPhoneNumber] = useState(phoneNumbers || "");
  const [filename, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      id: id,
    });
    setOpen(false);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImage = (e) => {
    const file = e.target.files;
    setFileName(file[0].name);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
    formData.append("cloud_name", "YOUR_CLOUD_NAME");
    let imageUrl;

    fetch("YOUR CLOUDINARY IMAGE UPLOAD URL", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        imageUrl = data.url;
      })
      .then(() => uploadUserImage({ profileImage: imageUrl, id: id }));
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
        <DialogTitle> Edit User </DialogTitle>
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
              name="phone"
              type="text"
              label="Phone Number"
              placeholder="Enter Phone Number"
              className={classes.textField}
              onChange={(event) => setPhoneNumber(event.target.value)}
              fullWidth
              value={phoneNumber}
            />
            <div className={classes.imageWrapper}>
              {filename ? (
                <small>{filename}</small>
              ) : (
                <small>Select User Image</small>
              )}
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImage}
              />
              <ToolTip title="Select User Image" placement="top">
                <IconButton onClick={handleEditPicture}>
                  <ImageIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
              </ToolTip>
            </div>
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

export default withStyles(styles)(EditUser);
