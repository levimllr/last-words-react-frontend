import React from "react";
import { indexColor } from '../services/format';

class HighScores extends React.Component {
  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  };

  handleClickOutside = (event) => {
    if (event.target.className === "modal") {
      this.props.modalOnClick()
    };
  };

  formatScore = (score) => {
    let scoreString = `${score}`;
    let scoreStringArray = scoreString.split("");
    if (scoreString.length < 4) {
        while (scoreStringArray.length < 4) {
            scoreStringArray.unshift("0");
        };
    };
    scoreString = scoreStringArray.join("");
    return scoreString;
  };

  formatIndex = (index) => {
    const rankMap = ["0TH", "1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH", "8TH", "9TH", "10TH"];
    return rankMap[index + 1];
  };

  render() {
    if (!this.props.show) {
      return null
    } else {
      return (
        <div className="modal">
          <div className="modal-content">
            <h1 className="modal-header" id="gameModalHeader">
              High Scores
            </h1>
            <ol className="modal-list">
              {this.props.highScores.map((highScore, index) => {
                return <li className="modal-list-item" style={{color: indexColor(index)}}>{this.formatIndex(index)}...{highScore.username}...{this.formatScore(highScore.total_score)} </li> 
              })}
            </ol>
          </div>
        </div>
      );
    };
  };
};

export default HighScores;
