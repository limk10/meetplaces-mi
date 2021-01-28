import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: "0 auto",
    marginBottom: theme.spacing(4),
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
  textField: {
    marginBottom: `${theme.spacing(1.5)}px !important`,
  },
}));

export default useStyles;
