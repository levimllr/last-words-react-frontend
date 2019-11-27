import React from "react";

const WordScreen  = props => {

  return (
    <div>
      <h2>Word</h2>
      <p className={"field"}>{props.status}</p>
    </div>
  );
};

export default WordScreen;
