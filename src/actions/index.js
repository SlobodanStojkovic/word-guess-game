import axios from "axios";

import { getLetterMatchCount } from "../helpers";
import { wordnikKey } from "../config.js";

export const WORDNIK_URL = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minLength=5&maxLength=5&api_key=${wordnikKey}`;

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
  RESET_GAME: "RESET_GAME",
  GIVE_UP: "GIVE_UP",
  USER_ENTERING: "USER_ENTERING",
  USER_ENTERED: "USER_ENTERED",
  SERVER_ERROR: "SERVER_ERROR",
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 *     and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
export const guessWord = (guessedWord) => {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

/**
 * Dispatch axios action to get secret word from random word server.
 * Separate this out so it can be used in getSecretWord and resetGame.
 * @function getSecretWordDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 *
 */
const getSecretWordDispatch = (dispatch) => {
  return axios
    .get("words.json")
    .then((response) => {
      const arrayOfWords = response.data;
      const randomWord =
        arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
      console.log(randomWord);
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: randomWord,
      });
    })
    .catch((error) => {
      dispatch({ type: actionTypes.SERVER_ERROR });
    });
};

/**
 * Dispatch axios action to get secret word from Wordnik.
 * Separate this out so it can be used in getSecretWord and resetGame.
 * @function getSecretWordWordnikDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 *
 */

//If you want to use secret words from Wordnik API then uncoment this code and replace it on lines 99 and 110
/* 
const getSecretWordWordnikDispatch = (dispatch) => {
  return axios
    .get(WORDNIK_URL)
    .then((response) => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data.word,
      });
    })
    .catch((error) => {
      console.log("------>ERROR!", error);
      dispatch({ type: actionTypes.SERVER_ERROR });
    });
}; */

/**
 * Returns Redux Thunk function that dispatches GET_SECRET_WORD action
 *     after axios promise resolves
 * @function getSecretWord
 * @returns {function} - Redux Thunk function.
 */
export const getSecretWord = () => {
  return getSecretWordDispatch;
};

/**
 * Action creator to reset game and get a new secret word.
 * @function resetGame
 * @returns {function} - Redux Thunk function that dispatches RESET_GAME action and calls getSecretWord().
 */
export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_GAME });
    return getSecretWordDispatch(dispatch);
  };
};

/**
 * Simple action creator that returns GIVE_UP action type.
 * @function giveUp
 * @returns {object} - GIVE_UP action type.
 */
export const giveUp = () => {
  return { type: actionTypes.GIVE_UP };
};

/**
 * Action creator to dispatch USER_ENTERED and SET_SECRET_WORD actions.
 * @function setUserSecretWord
 * @param {string} userSecretWord - Secret word entered by user.
 * @returns {function} - Redux Thunk function.
 */
export const setUserSecretWord = (userSecretWord) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: userSecretWord });
    dispatch({ type: actionTypes.USER_ENTERED });
  };
};

/**
 * Action creator that returns USER_ENTERING action type.
 * @function setUserEntering
 * @returns {object} - Action with type USER_ENTERING.
 */
export const setUserEntering = () => ({ type: actionTypes.USER_ENTERING });
