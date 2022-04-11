import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Word Guess Game</h1>
        <Congrats success={false} />
        <GuessedWords
          guessedWords={[
            { guessedWord: "train", letterMatchCount: 3 },
            { guessedWord: "agile", letterMatchCount: 1 },
            { guessedWord: "party", letterMatchCount: 5 },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
