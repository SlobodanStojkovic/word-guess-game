import { actionTypes } from "../actions";

/**
 * @function successReducer
 * @param {boolean} state - previous state.
 * @param {object} action - action to be reduced.
 * @returns {boolean} - new success state.
 */
const successReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};

export default successReducer;
