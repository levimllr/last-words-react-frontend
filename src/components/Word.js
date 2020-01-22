import React from "react";
import { indexColor } from '../services/format';

const Word  = props => {

  return <li style={{color: indexColor(props.misses.length)}}>{props.name}</li>
};

export default Word;
