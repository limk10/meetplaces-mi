import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter } from "react-router-dom";

import Appbar from "~/components/Appbar";
import GlobalStyle from "~/assets/css/global";
import { isAuthenticated } from "~/services/auth";
import Routes from "~/routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3C8E65",
    },
  },
});

const App = () => {
  if (!isAuthenticated())
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div style={{ minHeight: "100vh", backgroundColor: "#FCFCFC" }}>
          <Appbar />
          <Container style={{ paddingTop: 20 }} maxWidth="lg">
            <GlobalStyle />
            <Routes />
          </Container>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
