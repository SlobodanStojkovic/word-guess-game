import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { guessWord, giveUp } from "./actions";

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);

  const gaveUp = useSelector((state) => state.gaveUp);

  if (success || gaveUp) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(guessWord(currentGuess));
            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
        <button
          data-test="give-up-button"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(giveUp());
          }}
          className="btn btn-danger mb-2"
        >
          Give up
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
