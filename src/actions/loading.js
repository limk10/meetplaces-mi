import actionsTypes from "./actionsTypes";

export default {
  handleLoading: (value) => {
    return {
      type: actionsTypes.LOADING,
      payload: value,
    };
  },
};
