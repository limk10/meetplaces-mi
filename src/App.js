import React, { useEffect } from "react";
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
  useEffect(() => {
    loadScript();
  }, []);

  const loadScript = () => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;

    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
        }
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };
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
        <Appbar />
        <Container style={{ paddingTop: 20 }} maxWidth="xl">
          <GlobalStyle />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
