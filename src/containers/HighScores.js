import React from "react";

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
            
          </div>
        </div>
      );
    };
  };
};

export default HighScores;
