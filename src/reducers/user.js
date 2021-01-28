import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_LOGGED_USER:
      return { ...state, addLoggedUser: action.payload };

    default:
      return state;
  }
};

export default reducers;
