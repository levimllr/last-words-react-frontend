import React from "react";
import Button from "../components/Button";

class NewGame extends React.Component {

  createNewGame() {
    console.log("New Game!");
  };

  render() {
    if (!this.props.show) {
      return null
    } else {
      return (
        <div className="row">
          <Button clickAction={this.createNewGame()} btnTxt="New Game" />
        </div>
      );
    }
  };
};

export default NewGame;
