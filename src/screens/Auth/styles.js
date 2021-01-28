import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: "flex",
    alignItems: "center",
  },
  backgroundContainer: {
    background: "#6CCB94",
    backdropFilter: "blur(5px)",
  },
  loginContainer: {
    background: "#ffff",
    minHeight: "100vh",
    width: "70vw",
    margin: "0 auto",
    justifyContent: "center",
    textAlign: "center",
  },
  imageIllustration: {
    maxWidth: "80%",
    height: "auto",
    margin: "0 auto",
  },
  artSection: {
    flex: 1,
    borderRight: "1px solid #3C8E65",
    paddingTop: 30,
    paddingBottom: 30,
  },
  formSection: {
    flex: 1,
  },
  registerText: {
    marginTop: 20,
  },
  formContainer: {
    width: "85%",
    margin: "0 auto",
  },
  loginText: {
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitleLoginText: {
    textAlign: "left",
    color: "#6c757d",
    marginBottom: 30,
  },
  textField: {
    marginBottom: `${theme.spacing(2)}px !important`,
  },
  btnEnter: {
    marginTop: theme.spacing(1.5),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

export default useStyles;
