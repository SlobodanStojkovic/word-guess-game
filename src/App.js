import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import TotalGuesses from "./TotalGuesses";

import NewWordButton from "./NewWordButton";

import SecretWordReveal from "./SecretWordReveal";

import EnterWordButton from "./EnterWordButton";
import EnterWordForm from "./EnterWordForm";

import ServerError from "./ServerError";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

import {
  getSecretWord,
  resetGame,
  setUserSecretWord,
  setUserEntering,
} from "./actions";

function App() {
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);

  const gaveUp = useSelector((state) => state.gaveUp);

  const userEnter = useSelector((state) => state.userEnter);

  const serverError = useSelector((state) => state.serverError);

  // so that we can dispatch an action
  const dispatch = useDispatch();

  useEffect(() => {
    // get the secret word
    dispatch(getSecretWord());
  }, [dispatch]);

  let contents;

  if (serverError) {
    contents = <ServerError />;
  } else if (userEnter === "inProgress") {
    contents = (
      <EnterWordForm formAction={(word) => dispatch(setUserSecretWord(word))} />
    );
  } else {
    contents = (
      <div>
        <Congrats success={success} />

        <SecretWordReveal display={gaveUp} secretWord={secretWord} />

        <NewWordButton
          display={success || gaveUp}
          resetAction={() => dispatch(resetGame())}
        />

        <Input />
        <GuessedWords guessedWords={guessedWords} />

        <TotalGuesses guessCount={guessedWords.length} />

        <EnterWordButton
          display={guessedWords.length === 0}
          buttonAction={() => dispatch(setUserEntering())}
        />
      </div>
    );
  }
  return (
    <div data-test="component-app" className="container">
      <h1>Word Guess</h1>
      {contents}
    </div>
  );
}

export default App;
