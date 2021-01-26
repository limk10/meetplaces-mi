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

const SignUp = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleChange = (props, value) => {
    form[props] = value;
    setForm({ ...form });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const data = {
        email: form?.email,
        password: form?.password,
      };

      const { data: result } = await api.post("/register", data);

      toast.info(
        `Registro realizado com sucesso, você será redirecionado para o Home em instantes, aguarde... :)`,
        {
          position: "top-right",
          autoClose: 5000,
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
      }, 5500);
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
        Registre-se.
      </Typography>
      <Typography
        className={classes.subtitleLoginText}
        variant="body2"
        gutterBottom
      >
        Preencha todos os campos obrigatórios para o cadastro
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
            onClick={(e) => handleRegister(e)}
          >
            Cadastrar :)
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
