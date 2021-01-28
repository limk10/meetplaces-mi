import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  locationList: {
    height: "90vh",
    overflow: "auto",
  },
  btnSearh: {
    marginBottom: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

export default useStyles;
