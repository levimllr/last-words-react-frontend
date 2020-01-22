import React from "react";

class NewGame extends React.Component {
  state = {
    userNameArray: ["_", "_", "_"]
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
    window.addEventListener("keydown", this.handleKeyPress);
  };

  componentDidUpdate() {
    const newGameButton = document.getElementById("newGameButton");
    if (newGameButton) {
      newGameButton.focus();
    };
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  };

  handleClickOutside = (event) => {
    if (event.target.className === "modal") {
      this.props.modalOnClick()
    };
  };

  handleKeyPress = (event) => {
    let char = event.key.toLowerCase();
    let userNameArray = this.state.userNameArray;
    let replaceIndex = userNameArray.indexOf("_");
    if (event.keyCode === 13) {
        return
    } else if (event.keyCode === 8) {
      if (replaceIndex === -1) {
        userNameArray[2] = "_";
      } else {
        userNameArray[replaceIndex - 1] = "_";
      };
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      userNameArray[replaceIndex] = char.toUpperCase();
    };
    this.setState({userNameArray: userNameArray});
  };

  handleOnClick = (event) => {
    if (!this.state.userNameArray.includes("_")) {
      window.removeEventListener("keydown", this.handleKeyPress);
      this.props.handleNewPlayer(this.state.userNameArray);
    };
  };

  render() {
    if (!this.props.show) {
      return null
    } else {
      return (
        <div className="modal">
          <div className="modal-content">
            <h1 className="modal-header" id="gameModalHeader">
              Any last words, {this.state.userNameArray.join(" ")} ?
            </h1>
            {this.state.userNameArray.includes("_") ? <h3>Press any letter on your keyboard.</h3> : <button id="newGameButton" onClick={this.handleOnClick}>Face your fate.</button>}
          </div>
        </div>
      );
    };
  };
};

export default NewGame;
