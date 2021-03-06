import React from "react";
import TotalScore from "../components/TotalScore";
import Word from '../components/Word';

class GameInfo extends React.Component {

  renderGameWords() {
    let numberOfWords = 7;
    let wordArray;
    if (this.props.gameWords.length === 0) {
      wordArray = Array(numberOfWords).fill([<br key={`blank`}></br>]);
    } else {
      wordArray = this.props.gameWords.map((gameWord) => 
        <Word key={gameWord.word} name={gameWord.word} misses={gameWord.misses} />);
      if (wordArray.length < numberOfWords) {
        let blank = 1;
        while (wordArray.length < numberOfWords) {
        wordArray.push(<br key={`blank-${blank}`}></br>);
          blank +=1 ;
        }; 
      };
    };
    return wordArray.slice(-7);
  };

  listStart() {
    let startNumber;
    if (this.props.gameWords.length <= 7) {
      startNumber = 1;
    } else {
      startNumber = this.props.gameWords.length - 7;
    };
    return startNumber;
  };

  render() {

    return (
      <div>
        <h1>{this.props.highScore ? "High Score!" : "Last Words"}</h1>
        <ol start={this.listStart()}>
          {this.renderGameWords()}
        </ol>
        <TotalScore totalScore={this.props.totalScore} />
      </div>
    );
  };
};

export default GameInfo;
