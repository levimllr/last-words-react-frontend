import React from "react";
import Button from "../components/Button";
import Definition from "../components/Definition";
import GameInfo from "./GameInfo";
import WordInfo from "./WordInfo";

class GamePage extends React.Component {

  showScores =  () => console.log("HIGH SCORES!!!");

  newGame = () => console.log("NEW GAME!!!");

  render() {

    return (
      <div className="GamePage">
        <div>
          <GameInfo/>
          <Definition/>
          <Button btnTxt={"High Scores"} clickAction={this.showScores}/>
          <Button btnTxt={"New Game"} clickAction={this.newGame}/>
        </div>
        <div>
          <WordInfo/>
        </div>
      </div>
    );
  };
};

export default GamePage;
