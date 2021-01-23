import React from "react";
import Routes from "~/routes";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "~/assets/css/global";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5958A6"
    }
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
