import React from "react";
import Hangman from "../components/Hangman";
import WordScreen from "../components/WordScreen";
import Stat from "../components/Stat";

class WordInfo extends React.Component {

  showScores =  () => console.log("HIGH SCORES!!!");

  newGame = () => console.log("NEW GAME!!!");

  render() {

    return (
      <div className="WordInfo">
        <h1>WordInfo</h1>
        <Hangman/>
        <WordScreen/>
        <Stat btnTxt={"High Scores"} clickAction={this.showScores}/>
        <Stat btnText={"New Game"} clickAction={this.newGame}/>
      </div>
    );
  };
};

export default WordInfo;
