import React from 'react'

import styles from './GameInfoBox.module.css'

const ScoreBox = ({ score, secondsLeft }) => {
  return (
    <div className={styles.scoreboxContainer}>
      <div className={styles.scorebox}>{secondsLeft}</div>
      <div className={styles.info}>Time left</div>
      <br/>
      <div className={styles.scorebox}>{score}</div>
      <div className={styles.info}>Score</div>
    </div>
  );
}

export default ScoreBox
