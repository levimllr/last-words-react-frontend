import React from "react";

const Button = props => {

  return (
    <button onClick={props.clickAction}>{props.btnTxt}</button>
  );
};

export default Button;
