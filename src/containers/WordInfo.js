import React from "react";
import Hangman from "../components/Hangman";
import WordScreen from "../components/WordScreen";
import Stat from "../components/Stat";

class WordInfo extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    wordScreen: [],
    wordArray: [],
    hits: [],
    misses: [],
    wordDone: false
  };

  componentDidMount() {
    this.handleAttempt = this.handleAttempt.bind(this);
    window.addEventListener('keypress', this.handleAttempt);
  };

  componentDidUpdate() {
    if (Object.keys(this.props.word).length !== 0 && this.props.word.name.length  !== this.state.wordScreen.length ) {
      let wordLength = this.props.word.name.length;
      let wordScreen = Array(wordLength).fill("_");
      let wordArray = this.props.word.name.split("");
      this.setState({wordScreen: wordScreen, wordArray: wordArray});
    };
  };

  handleAttempt(event) {
    let char = event.key.toLowerCase();
    console.log(char);

    // ignore the return key
    if (event.keyCode == 13) {
      return
    };

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
  };

  render() {

    let wordScreen = this.state.wordScreen.length === 0 ? <br></br> : this.state.wordScreen.join(" ");
    let hitsDisplay = this.state.hits.length === 0 ? <br></br> : this.state.hits.join(" ");
    let missesDisplay = this.state.misses.length === 0 ? <br></br> : this.state.misses.join(" ");

    return (
      <div className="WordInfo">
        <h1>WordInfo</h1>
        <Hangman misses={this.state.misses.length} />
        <WordScreen status={wordScreen} />
        <Stat statName={"Hits"} condition={true} status={hitsDisplay} />
        <Stat statName={"Misses"} condition={false} status={missesDisplay} />
      </div>
    );
  };
};

export default WordInfo;
