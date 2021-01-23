import React from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "~/services/auth";

import Home from "~/screens/Home";
import Auth from "~/screens/Auth";
import Perfil from "~/screens/Perfil";
import NotFound from "~/screens/NotFound";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      rest={{ ...rest }}
      render={props =>
        isAuthenticated() ? (
          <Component props={{ ...props }} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/perfil" component={Perfil} />
      <Route exact path="/" component={Auth} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};


export default Routes;
