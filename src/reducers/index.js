import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import userEnter from "./userEnterReducer";

import gaveUp from "./gaveUpReducer";

import serverError from "./serverErrorReducer";

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  gaveUp,
  userEnter,
  serverError,
});
