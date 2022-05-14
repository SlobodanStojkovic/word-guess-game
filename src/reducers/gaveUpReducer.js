import { actionTypes } from "../actions";

/**
 * @function gaveUp
 * @param {boolean} state - Whether the user has given up.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - aveUp state.
 */
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.GIVE_UP:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};
