import React from "react";
import Hangman from "../components/Hangman";
import WordScreen from "../components/WordScreen";
import Stat from "../components/Stat";

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
};

function createWordScreen(wordArray) {
  let wordScreen = [];
  wordArray.forEach((character) => {
      if (isLetter(character)) {
          wordScreen.push('_');
      } else {
          wordScreen.push(character);
      }
  });
  return wordScreen;
};

class WordInfo extends React.Component {
  state = {
    wordScreen: [],
    wordArray: [],
    hits: [],
    misses: [],
    wordDone: false
  };

  componentDidMount() {
    this.handleAttempt = this.handleAttempt.bind(this);
  };

  componentDidUpdate() {
    if (Object.keys(this.props.word).length !== 0 && this.props.word.name !== this.state.wordArray.join("") ) {
      let wordArray = this.props.word.name.split("");
      let wordScreen = createWordScreen(wordArray);
      if (this.props.listening) {
         window.addEventListener('keypress', this.handleAttempt);
      } else {
         window.removeEventListener('keypress', this.handleAttempt);
      };
      this.setState({
        wordScreen: wordScreen, 
        wordArray: wordArray,
        hits: [],
        misses: [],
        wordDone: false
      });
    };
  };

  handleAttempt(event) {
    let char = event.key.toLowerCase();

    // ignore the return key
    if (event.keyCode === 13) {
      return
    };

    console.log(event.keyCode);

    if (/[a-zA-Z]/.test(char) && this.state.wordDone === false) {
      if (this.state.wordArray.includes(char) ) {
        console.log("Hit!");
        this.handleHit(char);
      } else {
        console.log("Miss!")
        this.handleMiss(char);
      };
    };
  };

  handleHit(char) {
    let hits = this.state.hits;
    if (hits.includes(char)) {
      return
    } else {
      hits.push(char);
      this.setState({hits: hits});
      this.revealScreen(char);
    };
  };

  handleMiss(char) {
    let misses = this.state.misses;
    if (misses.includes(char)) {
      return
    } else {
      misses.push(char);
      this.setState({misses: misses});
    };
    if (misses.length === 6) {
      window.removeEventListener('keypress', this.handleAttempt);
      this.setState({wordScreen: this.state.wordArray});
      return;
    };
  };

  revealScreen(char) {
    let wordArray = this.state.wordArray;
    let wordScreen = this.state.wordScreen;
    for (let i = 0; i < this.state.wordArray.length; i++) {
      if (char === wordArray[i]) {
          wordScreen[i] = wordArray[i];
      };
    };
    this.setState({wordScreen: wordScreen});
    if (this.state.wordArray.join("") === this.state.wordScreen.join("")) {
      this.props.handleWin(this.state.misses);
    };
  };

  render() {

    let wordScreen = this.state.wordScreen.length === 0 ? <br></br> : this.state.wordScreen.join(" ");
    let hitsDisplay = this.state.hits.length === 0 ? <br></br> : this.state.hits.join(" ");
    let missesDisplay = this.state.misses.length === 0 ? <br></br> : this.state.misses.join(" ");

    return (
      <div className="WordInfo">
        <Hangman misses={this.state.misses.length} />
        <WordScreen status={wordScreen} />
        <Stat statName={"Hits"} condition={true} status={hitsDisplay} />
        <Stat statName={"Misses"} condition={false} status={missesDisplay} />
      </div>
    );
  };
};

export default WordInfo;
