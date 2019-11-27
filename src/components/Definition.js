import React from "react";

const Definition  = props => {

  return (
    <div>
      <h2>Definition</h2>
      <p className={"field definitionField"}>{props.text}</p>
    </div>
  );
};

export default Definition;
