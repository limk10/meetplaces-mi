const tokenName = process.env.REACT_APP_TOKEN_KEY;
export const isAuthenticated = () => localStorage.getItem(tokenName);
export const getToken = () => localStorage.getItem(tokenName);

export const signIn = async (token) => {
  await localStorage.setItem(tokenName, token);
  window.location = "/home";
};
export const logout = async () => {
  await localStorage.removeItem(tokenName);
  window.location = "/";
};
