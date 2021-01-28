import React, { useEffect, useState } from "react";
import { Typography, Link, Hidden } from "@material-ui/core";

import useStyles from "./styles";

import meetIllustration from "~/assets/images/g10.svg";
import { isAuthenticated } from "~/services/auth";

import { useHistory } from "react-router-dom";

import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

const Login = () => {
  const [wantRegister, setWantRegister] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) history.push("/home");
  }, []);

  return (
    <div
      className={`${classes.backgroundContainer} ${classes.centeredContainer}`}
    >
      <div className={`${classes.loginContainer} ${classes.centeredContainer}`}>
        <Hidden smDown>
          <div className={classes.artSection}>
            <img
              loading="lazy"
              className={classes.imageIllustration}
              src={meetIllustration}
            />
          </div>
        </Hidden>
        <div className={classes.formSection}>
          {!wantRegister && (
            <>
              <SignInForm />
              <Typography
                className={classes.registerText}
                variant="body1"
                gutterBottom
              >
                Não possui conta?{" "}
                <Link href="#" onClick={() => setWantRegister(!wantRegister)}>
                  Registre-se
                </Link>
              </Typography>
            </>
          )}
          {wantRegister && (
            <>
              <SignUpForm />
              <Typography
                className={classes.registerText}
                variant="body1"
                gutterBottom
              >
                Já possui uma conta?{" "}
                <Link href="#" onClick={() => setWantRegister(!wantRegister)}>
                  Log in
                </Link>
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
