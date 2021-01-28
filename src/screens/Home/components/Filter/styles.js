import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btnEnter: {
    marginTop: theme.spacing(2),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -12,
  },
}));

export default useStyles;
