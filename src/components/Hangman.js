import React from "react";

class Hangman extends React.Component {

  componentDidMount(){
    document.getElementById("scaffoldImg")
      .addEventListener('transitionend', this.props.removeTransition);
  };

  render() {

    const imagePath = `/img/Hangman-${this.props.misses}.png`;
    const altText = `Hangman with ${this.props.misses} of 6 misses`;

    return (
      <div>
        <img id="scaffoldImg" src={imagePath} alt={altText}></img>
      </div>
    );
  };
};

export default Hangman;
