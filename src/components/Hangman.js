import React from "react";

class Hangman extends React.Component {

  componentDidMount(){
    document.getElementById("scaffoldImg")
      .addEventListener('transitionend', this.props.removeTransition);
  };

  imagePath = `/img/Hangman-${this.props.misses}.png`;
  altText = `Hangman with ${this.props.misses} of 6 misses`;

  render() {
    return (
      <div>
        <img id="scaffoldImg" src={this.imagePath} alt={this.altText}></img>
      </div>
    );
  };
};

export default Hangman;
