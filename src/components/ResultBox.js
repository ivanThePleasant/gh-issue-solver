import React from "react";

import styles from "./ResultBox.module.css";

const ResultBox = ({ score }) => {
  return (
    <div className={styles.result}>
      <br/>
      <h3>GAME OVER!</h3>
      <br/>
      <h3>You scored: {score}</h3>
      <br/>
      <h3>PRESS SPACE TO PLAY AGAIN</h3>
    </div>
  );
};

export default ResultBox;
