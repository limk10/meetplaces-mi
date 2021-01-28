import actionsTypes from "./actionsTypes";

export default {
  addLoggedUser: (value) => {
    return {
      type: actionsTypes.ADD_LOGGED_USER,
      payload: value,
    };
  },
};
