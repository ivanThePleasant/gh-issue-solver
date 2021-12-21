import React from "react";

import Steps from "./Steps";

import styles from './Game.module.css'
import bg from '../assets/bg.gif'

const fixes = [
  {
    name: "Typo",
  },
  {
    name: "Connector",
  },
  {
    name: "Fix bad PR",
  },
  {
    name: "Missing dependencies",
  },
  {
    name: "Documentation",
  },
];

const replies = [
  {
    name: "Node version",
  },
  {
    name: "Check config",
  },
  {
    name: "Documentation",
  },
  {
    name: "It's fixed in V4",
  },
  {
    name: "Learn NGINX",
  },
];

const getNewIssue = () => {
  const issue = []
  const numberOfSteps = Math.floor(Math.random() * 4)
  const issueType = Math.floor(Math.random() * 2)

  const assembleTicket = (issueType) => {
    for (let i = 0; i < numberOfSteps; i++) {
      const randomStep = issueType[Math.floor(Math.random() * issueType.length)];
      issue.push({
        ...randomStep,
      });
    }
  }

  if (issueType === 0) {
    assembleTicket(fixes)
  } else {
    assembleTicket(replies)
  }

  return issue
  
}

const Game = () => {
  return (
    <div className={styles.game}>
      <img className={styles.background } src={bg} alt="background"/>
      <Steps />
    </div>
  )
}

export default Game