import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Container,
} from "@material-ui/core";

import useStyles from "./styles";

import actionsUser from "~/actions/user";

import api from "~/services/api";

const Perfil = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loggedUser = useSelector((state) => state.reducerUser.addLoggedUser);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put("/users/4", loggedUser);

      toast.info(
        `${loggedUser?.first_name}, seus dados foram alterados com sucesso!`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (props, value) => {
    loggedUser[props] = value;
    dispatch(actionsUser.addLoggedUser({ ...loggedUser }));
  };

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="sm">
          <form noValidate autoComplete="off">
            <Avatar
              alt="Remy Sharp"
              src={loggedUser?.avatar}
              className={classes.large}
            />

            <TextField
              className={classes.textField}
              value={loggedUser?.email}
              fullWidth
              id="outlined-basic"
              type="email"
              label={loggedUser?.email ? "" : "E-mail"}
              variant="outlined"
              onChange={(e) => handleChange("email", e?.target?.value)}
            />

            <TextField
              className={classes.textField}
              value={loggedUser?.first_name}
              label={loggedUser?.first_name ? "" : "Primeiro nome"}
              fullWidth
              type="text"
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange("first_name", e?.target?.value)}
            />

            <TextField
              className={classes.textField}
              value={loggedUser?.last_name}
              label={loggedUser?.last_name ? "" : "Último nome"}
              fullWidth
              type="text"
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange("last_name", e?.target?.value)}
            />

            <div className={classes.wrapper}>
              <Button
                className={classes.btnEnter}
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => handleSave(e)}
              >
                Salvar :)
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Perfil;
