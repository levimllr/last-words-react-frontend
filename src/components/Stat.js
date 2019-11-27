import React from "react";

const Stat  = props => {

  return (
    <div className={"preField"}>
      <h3>{props.statName}</h3>
      <p className={"field"}>{props.status}</p>
    </div>
  );
};

export default Stat;
