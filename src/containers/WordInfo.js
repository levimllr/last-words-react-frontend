import React from "react";
import Hangman from "../components/Hangman";
import WordScreen from "../components/WordScreen";
import Stat from "../components/Stat";

class WordInfo extends React.Component {

  render() {

    return (
      <div className="WordInfo">
        <h1>WordInfo</h1>
        <Hangman/>
        <WordScreen/>
        <Stat statName={"Hits"} condition={true}/>
        <Stat statName={"Misses"} condition={false}/>
      </div>
    );
  };
};

export default WordInfo;
