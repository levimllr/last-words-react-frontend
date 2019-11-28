import React from "react";
import TotalScore from "../components/TotalScore";
import Word from '../components/Word';

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  };

  renderGameWords() {
    let numberOfWords = 7;
    let wordArray;
    if (this.props.gameWords.length === 0) {
      wordArray = Array(numberOfWords).fill([<br></br>]);
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
    console.log(wordArray);
    return wordArray;
  };

  render() {

    return (
      <div>
        <h1>Last Words</h1>
        <ol>
          {this.renderGameWords()}
        </ol>
        <TotalScore totalScore={this.props.totalScore} />
      </div>
    );
  };
};

export default GameInfo;
