import React from "react";
import Button from "../components/Button";
import Definition from "../components/Definition";
import GameInfo from "./GameInfo";
import WordInfo from "./WordInfo";

const domain = 'http://localhost:3000';
// const domain = 'https://last-words-on-rails.herokuapp.com';

class GamePage extends React.Component {
  state = {
    allWords: [],
    gameWords: [],
    currentWord: {},
    highScores: []
  };

  componentDidMount() {
    let wordResource = '/words/random';
    let scoreResource = '/games/high_scores';
    let wordUrl = domain + wordResource;
    let scoreUrl = domain  + scoreResource;
    fetch(wordUrl)
      .then(resp => resp.json())
      .then(json => this.setState({allWords: json}));
    fetch(scoreUrl)
      .then(resp => resp.json())
      .then(json => this.setState({highScores: json}));
  };

  showScores =  () => console.log("HIGH SCORES!!!");

  newGame = () => {
    let allWords = this.state.allWords;
    let currentWord = allWords.pop();
    this.setState({allWords: allWords, currentWord: currentWord});
  };

  handleLoss = () => {
    console.log("You lose.")
    let allWords = this.state.allWords;
    let currentWord = allWords.pop();
    this.setState({allWords: allWords, currentWord: currentWord});
  };

  handleWin = () =>  {
    console.log("You win!")
    let gameWords = this.state.gameWords;
    gameWords.push(this.state.currentWord);
    let allWords = this.state.allWords;
    let currentWord = allWords.pop();
    this.setState({allWords: allWords, gameWords: gameWords, currentWord: currentWord});
  };

  render() {

    let definition = Object.keys(this.state.currentWord).length === 0 ? <br></br> : (this.state.currentWord.major_class + "  " + this.state.currentWord.definition);

    return (
      <div className="GamePage">
        <div>
          <GameInfo/>
          <Definition text={definition}/>
          <Button btnTxt={"High Scores"} clickAction={this.showScores}/>
          <Button btnTxt={"New Game"} clickAction={this.newGame}/>
        </div>
        <div>
          <WordInfo word={this.state.currentWord} handleLoss={this.handleLoss} handleWin={this.handleWin} />
        </div>
      </div>
    );
  };
};

export default GamePage;
