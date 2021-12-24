import React from 'react'

import styles from './IssueBox.module.css'

const IssueBox = ({ gameOver, steps, currentIssue }) => {
  return (
    <div className={styles.issue}>
      <h3>Current issue:</h3>
      <br />
      <ol>
        {currentIssue.map((step, index) => (
          <li key={index}>
            {!gameOver &&
            steps[index] &&
            steps[index].name === step.name
              ? "✅"
              : steps.length > index
              ? "❌"
              : ""}
            {step.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default IssueBox
