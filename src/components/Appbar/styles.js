import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    cursor: "pointer",
    padding: "12px",
    color: theme.palette.primary.main,
    "&:hover": {
      color: "#2d6b4c",
    },
  },
  menu: {
    fontSize: "0.9rem",
    cursor: "pointer",
    padding: "17px 8px 17px 8px",
    transition: "all .2s ease-in-out",
    "&:first-child": {
      borderLeft: "1px solid #F2F2F2",
      paddingLeft: "16px",
    },
    "&:last-child": {
      borderRight: "1px solid #F2F2F2",
      paddingRight: "16px",
    },
    "&:hover": {
      color: "#403D44",
    },
  },
  dividerMenu: {
    fontSize: "1rem",
    padding: "15px",
  },
  divider: {
    display: "flex",
  },
  appBar: {
    color: "#8C8B8E",
    backgroundColor: "#FFFFFF",
    boxShadow: "none",
    borderBottom: "1px solid #F2F2F2",
  },
  menuIcon: {
    borderRight: "1px solid #F2F2F2",
    borderLeft: "1px solid #F2F2F2",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  menuPerfil: {
    top: "49px !important",
  },
}));

export default useStyles;
