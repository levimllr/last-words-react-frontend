import React from "react";
import Button from "../components/Button";
import Definition from "../components/Definition";
import GameInfo from "./GameInfo";
import WordInfo from "./WordInfo";

const domain = 'http://localhost:3001';
// const domain = 'https://last-words-on-rails.herokuapp.com';

let gamesResource = '/games';
let wordResource = '/words/random';
let scoreResource = '/games/high_scores';
let gamesUrl = domain + gamesResource;
let wordUrl = domain + wordResource;
let scoreUrl = domain  + scoreResource;

class GamePage extends React.Component {
  state = {
    allWords: [],
    gameWords: [],
    currentWord: {},
    highScores: [],
    gameOver: true,
    gameId: null,
    username: "",
    totalScore: 0
  };

  componentDidMount() {
    this.fetchAll();
  };

  componentDidUpdate() {
    if (this.state.gameOver === true) {
      this.fetchAll();
      this.setState({gameOver: false});
    };
  };

  fetchAll() {
    fetch(wordUrl)
      .then(resp => resp.json())
      .then(json => this.setState({allWords: json}));
    fetch(scoreUrl)
      .then(resp => resp.json())
      .then(json => this.setState({highScores: json}));
  };

  postNewGame() {
    let data = {
      username: "AAA",
      total_score: this.state.totalScore
    };
    fetch(gamesUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        response => response.json()
    ).then(
        json => this.setState({
          gameId: json.id,
          username: json.username
        })
    );
  };

  updateGame(gameWord) {
    // console.log(gameWord);
    let gameWordResource = `/games/${this.state.gameId}/game_words`;
    let url = domain + gameWordResource;
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameWord)
    })
    .then(response => response.json())
    .then(json => {
      gameWord.score = json.score;
      let totalScore = this.state.totalScore + gameWord.score;
      this.setState({totalScore: totalScore});
      console.log(`Total Score: ${this.state.totalScore}`);
    })
    .then(() => {
      let gameWords = this.state.gameWords;
      gameWords.push(gameWord);

      let allWords = this.state.allWords;
      let currentWord = allWords.pop();
      this.setState({
        allWords: allWords, 
        gameWords: gameWords, 
        currentWord: currentWord
      });
    });
  };

  showScores =  () => console.log("HIGH SCORES!!!");

  newGame = () => {
    this.setState({
      gameOver: true,
      gameWords: []
    });
    let allWords = this.state.allWords;
    let currentWord = allWords.pop();
    this.postNewGame();
    this.setState({
      allWords: allWords, 
      currentWord: currentWord
    });
  };

  handleLoss = () => {
    console.log("You lose.")
  };

  calculateScore = (word, misses) => {
    let score = word.points + word.name.length - (2 * misses.length);
    return score;
  };

  handleWin = (misses) =>  {
    let wordScore = this.calculateScore(this.state.currentWord, misses);
    console.log(`Word Score: ${wordScore}`);
    let gameWord = {
      game_id: this.state.gameId,
      word_id: this.state.currentWord.id,
      word: this.state.currentWord.name,
      misses: misses.join(""),
      win: true
    };
    this.updateGame(gameWord);

    // let allWords = this.state.allWords;
    // let currentWord = allWords.pop();
    // let totalScore = this.state.totalScore + wordScore;
    // this.setState({
    //   allWords: allWords, 
    //   gameWords: gameWords, 
    //   currentWord: currentWord,
    //   totalScore: totalScore
    // });
  };

  render() {

    let definition = Object.keys(this.state.currentWord).length === 0 ? <br></br> : (this.state.currentWord.major_class + "  " + this.state.currentWord.definition);

    return (
      <div className="GamePage">
        <div>
          <GameInfo totalScore={this.state.totalScore} gameWords={this.state.gameWords} />
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
