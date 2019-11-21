import React from "react";

const Hangman = props => {

  let imagePath = `/img/Hangman-${props.misses}.png`;
  let altText = `Hangman with ${props.misses} of 6 misses`;

  return (
    <div>
      <img src={imagePath} alt={altText}></img>
    </div>
  );
};

export default Hangman;
