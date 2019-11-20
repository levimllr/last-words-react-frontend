import React from "react";

const Stat  = props => {

  return (
    <div>
      <h2>{props.statName}</h2>
      <p>{props.status}</p>
    </div>
  );
};

export default Stat;
