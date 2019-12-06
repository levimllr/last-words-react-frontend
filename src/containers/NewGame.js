import React from "react";

const userNameBlank = ["_", "_", "_"];

class NewGame extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    userNameArray: userNameBlank
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
    window.addEventListener("keydown", this.handleKeyPress);
  };

  componentWillUnmount() {
    
  };

  handleClickOutside = (event) => {
    if (event.target.className === "modal") {
      this.props.modalOnClick()
    };
  };

  handleKeyPress = (event) => {
    console.log(event);
    let char = event.key.toLowerCase();
    let userNameArray = this.state.userNameArray;
    let replaceIndex = userNameArray.indexOf("_");
    if (event.keyCode == 13) {
        return
    } else if (event.keyCode == 8) {
      userNameArray[replaceIndex - 1] = "_";
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      userNameArray[replaceIndex] = char.toUpperCase();
    };
    this.setState({userNameArray: userNameArray});
    if (userNameArray.includes("_") === false) {
      window.removeEventListener("keydown", this.handleKeyPress);
      this.props.handleNewPlayer(userNameArray);
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
            <h3>Press any letter on your keyboard.</h3>
          </div>
        </div>
      );
    };
  };
};

export default NewGame;