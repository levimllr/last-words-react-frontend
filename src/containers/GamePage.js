import React from "react";
import Button from "../components/Button";
import Definition from "../components/Definition";
import GameInfo from "./GameInfo";
import NewGame from "./NewGame";
import WordInfo from "./WordInfo";
import HighScores from "./HighScores";

// const domain = 'http://localhost:3001';
const domain = 'https://last-words-on-rails.herokuapp.com';

let gamesResource = '/games';
let wordResource = '/words/random';
let scoreResource = '/games/high_scores';
let gamesUrl = domain + gamesResource;
let wordUrl = domain + wordResource;
let scoreUrl = domain  + scoreResource;

class GamePage extends React.Component {
  state = {
    showNewGame: false,
    showHighScores: false,
    allWords: [],
    gameWords: [],
    currentWord: {},
    highScores: [],
    gameOver: true,
    gameId: null,
    username: "",
    totalScore: 0,
    listening: false,
    highScore: false
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

  removeTransition = (event) =>  {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('missing');
  };

  showModal = (event) => {
    console.log("Show modal!");
    this.setState({listening: false});
    if (event.target.innerText === "New Game") {
      this.setState({
        showNewGame: true,
        gameId: null,
        username: "",
        totalScore: 0
      });
    } else if (event.target.innerText === "High Scores") {
      this.setState({
        showHighScores: true
      });
    };
  };

  modalOnClick = () => {
    console.log("Modal click!");
    if (this.state.showNewGame === true) {
      this.setState({
        showNewGame: false
      });
    } else if (this.state.showHighScores === true) {
      this.setState({
        showHighScores: false
      });
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

  postNewGame(username) {
    let data = {
      username: username,
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

  postGameWord(gameWord) {
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

      this.updateGame();
    });
  };

  updateGame() {
    let url = domain + `/games/${this.state.gameId}`;
    let data = {
        game: {
          id: this.state.gameId,
          username: this.state.username,
          total_score: this.state.totalScore
        }
    };
    fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
  };

  showScores =  () => console.log("HIGH SCORES!!!");

  newGame = (userNameArray) => {
    const username = userNameArray.join("");
    this.setState({
      showNewGame: false,
      gameOver: true,
      gameWords: [],
      totalScore: 0,
      username: username,
      highScore: false
    });
    let allWords = this.state.allWords;
    let currentWord = allWords.pop();
    this.postNewGame(username);
    this.setState({
      allWords: allWords, 
      currentWord: currentWord,
      listening: true
    });
  };

  handleLoss = () => {
    console.log("You lose.");
    fetch(scoreUrl)
      .then(resp => resp.json())
      .then(json => this.setState({highScores: json}))
      .then(() => {
        const lowestHighScore = this.state.highScores[this.state.highScores.length - 1].total_score
        if (this.state.totalScore >= lowestHighScore) {
          this.setState({highScore: true});
        };
      });
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
    this.postGameWord(gameWord);
  };

  render() {

    let definition = Object.keys(this.state.currentWord).length === 0 ? <br></br> : (this.state.currentWord.major_class + "  " + this.state.currentWord.definition);

    return (
      <div className="row">
        <div className={"column column-left"}>
          <GameInfo 
            totalScore={this.state.totalScore} 
            gameWords={this.state.gameWords} 
            highScore={this.state.highScore}
          />
          <Definition text={definition}/>
          <Button btnTxt={"High Scores"} clickAction={this.showModal} />
          <Button btnTxt={"New Game"} clickAction={this.showModal}/>
        </div>
        <div className={"column column-right"}>
          <WordInfo 
            word={this.state.currentWord} 
            handleLoss={this.handleLoss} 
            handleWin={this.handleWin}
            listening={this.state.listening}
            removeTransition={this.removeTransition}
          />
        </div>
        {this.state.showNewGame ? <NewGame show={this.state.showNewGame} handleNewPlayer={this.newGame} modalOnClick={this.modalOnClick} removeTransition={this.removeTransition} /> : "" }
        {this.state.showHighScores ? <HighScores highScores={this.state.highScores} show={this.state.showHighScores} modalOnClick={this.modalOnClick} /> : "" }
      </div>
    );
  };
};

export default GamePage;
