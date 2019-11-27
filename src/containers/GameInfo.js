import React from "react";
import TotalScore from "../components/TotalScore";
import Word from '../components/Word';

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  };

  renderGameWords() {
    if (this.props.gameWords.length === 0) {
      return (Array(5).fill([<br></br>]))
    } else {
      return this.props.gameWords.map((gameWord) => 
        <Word key={gameWord.word} name={gameWord.word} misses={gameWord.misses} />
      );
    };
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
