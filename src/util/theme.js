import teal from "@material-ui/core/colors/teal";

export default {
  palette: {
    primary: teal,
    secondary: {
      main: "#00bfa5",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  alert: {
    display: "flex",
    marginBottom: 20,
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 75,
    objectFit: "cover",
    borderRadius: "50%",
    margin: "10px auto 10px 0",
  },
  pageTitle: {
    fontSize: "50px",
    fontWeight: "bolder",
    marginBottom: "20px",
    marginTop: "30px",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8 ren",
    marginTop: 5,
  },
  textField: {
    marginTop: "10px",
  },
  progress: {
    position: "absolute",
  },
  sImage: {
    width: 100,
    margin: "0 auto 10px 0",
  },
  sPageTitle: {
    fontWeight: "bolder",
    marginBottom: "0px",
  },
  sButton: {
    marginTop: 10,
    position: "relative",
  },
  editButton: {
    marginTop: 10,
    float: "right",
  },
  submitButton: {
    position: "relative",
    marginTop: "10px",
    left: "84%",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "92%",
    top: "-1%",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  // buttons: {
  //   textAlign: 'center',
  //   '& a': {
  //     margin: '20px 10px'
  //   }
  // }
  imageWrapper: {
    marginTop: 10,
  },
};
