import React from "react";
import Button from "../components/Button";
import Definition from "../components/Definition";
import GameInfo from "./GameInfo";
import WordInfo from "./WordInfo";

class GamePage extends React.Component {

  render() {

    return (
      <div className="GamePage">
        <div>
          <GameInfo/>
          <Definition/>
          <Button/>
          <Button/>
        </div>
        <div>
          <WordInfo/>
        </div>
      </div>
    );
  };
};

export default GamePage;
