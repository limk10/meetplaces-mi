import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import api from "~/services/api";
import { signIn } from "~/services/auth";

import useStyles from "../styles";

const SignIn = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleChange = (props, value) => {
    form[props] = value;
    setForm({ ...form });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = {
        email: form?.email,
        password: form?.password,
      };

      const { data: result } = await api.post("/login", data);

      toast.info(
        `Seja bem-vindo(a) novamente, estavamos esperando por você :)`,
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

      setTimeout(() => {
        setLoading(false);
        signIn(result?.token);
      }, 2000);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography
        className={`${classes.subtitleLoginText}`}
        variant="h4"
        gutterBottom
      >
        &gt; Meet Places
      </Typography>
      <Typography className={`${classes.loginText}`} variant="h5" gutterBottom>
        Log in.
      </Typography>
      <Typography
        className={classes.subtitleLoginText}
        variant="body2"
        gutterBottom
      >
        Entre com os dados inseridos durante o registro
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textField}
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          onChange={(e) => handleChange("email", e?.target?.value)}
        />
        <TextField
          className={classes.textField}
          fullWidth
          label="Senha"
          variant="outlined"
          type="password"
          name="password"
          onChange={(e) => handleChange("password", e?.target?.value)}
        />
        <div className={classes.wrapper}>
          <Button
            className={classes.btnEnter}
            disabled={loading}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => handleLogin(e)}
          >
            Entrar :)
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
