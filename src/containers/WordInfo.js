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
    hits: [],
    misses: [],
    wordDone: false
  };

  componentDidUpdate() {
    if (Object.keys(this.props.word).length !== 0 && this.props.word.name.length  !== this.state.wordScreen.length ) {
      let wordLength = this.props.word.name.length;
      let wordScreen = Array(wordLength).fill("_");
      console.log(wordScreen);
      this.setState({wordScreen: wordScreen});
    };
  };

  render() {

    let wordScreen = this.state.wordScreen.length === 0 ? <br></br> : this.state.wordScreen.join(" ");
    let hitsDisplay = this.state.hits.length === 0 ? <br></br> : this.state.hits.join(" ");
    let missesDisplay = this.state.misses.length === 0 ? <br></br> : this.state.misses.join(" ");

    return (
      <div className="WordInfo">
        <h1>WordInfo</h1>
        <Hangman misses={this.state.misses} />
        <WordScreen status={wordScreen} />
        <Stat statName={"Hits"} condition={true} status={hitsDisplay} />
        <Stat statName={"Misses"} condition={false} status={missesDisplay} />
      </div>
    );
  };
};

export default WordInfo;
