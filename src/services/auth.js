const token = process.env.REACT_APP_TOKEN_KEY
export const isAuthenticated = () => localStorage.getItem(token);
export const getToken = () => localStorage.getItem(token);

export const signin = async token => {
  await localStorage.setItem(token, token);
  window.location = "/";
};
export const logout = async () => {
  await localStorage.removeItem(token);
  window.location = "/signin";
};