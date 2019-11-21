import React from "react";

const Hangman = props => {

  let imagePath = `/img/Hangman-${props.misses}.png`;

  return (
    <div>
      <img src={imagePath}></img>
    </div>
  );
};

export default Hangman;
