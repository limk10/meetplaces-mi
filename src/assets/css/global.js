import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  * {
    font-family: 'Montserrat', sans-serif !important;
    padding: 0;
    margin: 0;
    vertical-align:baseline;
    list-style:none;
    border: 0;
  }

  .Toastify__toast-body {
    white-space: pre-line;
  }

`;
