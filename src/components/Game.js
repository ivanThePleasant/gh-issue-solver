import React, { useState, useEffect } from "react";

import Steps from "./Steps";

import styles from './Game.module.css'
import bg from '../assets/bg.gif'
import IssueBox from "./IssueBox";
import ScoreBox from "./GameInfoBox";
import ResultBox from "./ResultBox";

const fixes = [
  {
    name: "Typo",
    icon: ["fas", "font"],
  },
  {
    name: "Connector",
    icon: ["fas", "plug"],
  },
  {
    name: "Fix bad PR",
    icon: ["fas", "code-branch"],
  },
  {
    name: "Missing dependencies",
    icon: ["fas", "link"],
  },
  {
    name: "Documentation",
    icon: ["fas", "file-alt"],
  },
  {
    name: "Push code",
    icon: ["fas", "upload"],
  },
  {
    name: "Node version",
    icon: ["fab", "node-js"],
  },
  {
    name: "Check config",
    icon: ["fas", "cog"],
  },
  {
    name: "Ask community",
    icon: ["fas", "comments"],
  },
  {
    name: "It's fixed in V4",
    icon: ["fas", "hammer"],
  },
  {
    name: "Learn NGINX",
    icon: ["fas", "server"],
  },
  {
    name: "Comment",
    icon: ["fas", "comment"],
  },
];


const getNewIssue = () => {
  const issue = []
  let numberOfSteps = Math.floor(Math.random() * 4)
  const issueType = Math.floor(Math.random() * 2)

  const assembleTicket = (issueType) => {
    for (let i = 0; i < numberOfSteps; i++) {
      const randomStep = issueType[Math.floor(Math.random() * (issueType.length))];
      if (randomStep.name === 'Comment' || randomStep.name === 'Push code') {
        numberOfSteps += 1
        break
      }
      issue.push({
        ...randomStep,
      });
    }
  }

  assembleTicket(fixes);

  if (issueType === 0) {
    issue.push(fixes[5])
  } else {
    issue.push(fixes[11]);
  }

  return issue
  
}

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [gameEnd, setGameEnd] = useState(new Date());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [badFix, setBadFix] = useState(false);
  const [currentIssue, setCurrentIssue] = useState([
    {
      name: "NO ISSUE YET",
    },
  ]);
  const [selectedStep, setSelectedStep] = useState(-1)
  const [currentSteps, setCurrentSteps] = useState([]);



  useEffect(() => {
    const listener = (event) => {
      if (!started || gameOver) {
        if (event.key === " ") {
          setScore(0);
          setGameOver(false);
          setStarted(true);
          setSelectedStep(0);
          setCurrentIssue(getNewIssue());
          setGameEnd(Date.now() + 62 * 1000);
          setSecondsLeft(62);
        }
      }
      if (started) {
        if (event.key === "ArrowRight") {
          setSelectedStep((prevValue) => {
            const nextIndex = prevValue + 1;
            return nextIndex >= fixes.length ? 0 : nextIndex;
          });
        } else if (event.key === "ArrowLeft") {
          setSelectedStep((prevValue) => {
            const nextIndex = prevValue - 1;
            return nextIndex < 0 ? fixes.length - 1 : nextIndex;
          });
        } else if (event.key === "ArrowUp") {
          setSelectedStep((prevValue) => {
            const nextIndex = prevValue - 6;
            return nextIndex < 0 ? prevValue + 6 : nextIndex;
          });
        } else if (event.key === "ArrowDown") {
          setSelectedStep((prevValue) => {
            const nextIndex = prevValue + 6;
            return nextIndex >= fixes.length ? prevValue - 6 : nextIndex;
          });
        } else if (event.key === "Enter") {
          setCurrentSteps((prevValue) => [
            ...prevValue,
            {
              id: Date.now(),
              ...fixes[selectedStep],
            },
          ]);
        }
      }
    };

    if (!badFix) {
      document.addEventListener("keydown", listener);
    }

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [gameOver, started, badFix, selectedStep]);

  useEffect(() => {
    if (currentSteps.length) {
      for (let i = 0; i < currentSteps.length; i++) {
        if (currentIssue[i].name !== currentSteps[i].name) {
          setTimeout(() => {
            setBadFix(false);
            setCurrentSteps([]);
          }, 2000);
          setScore((prevValue) => prevValue - currentIssue.length);
          setGameEnd((prevValue) => prevValue - currentIssue.length * 1000);
          return setBadFix(true);
        }
      }
      if (currentSteps.length === currentIssue.length) {
        setTimeout(() => {
          if (!gameOver) {
            setScore((prevValue) => prevValue + currentIssue.length);
            setBadFix(false);
            setCurrentSteps([]);
            setCurrentIssue(getNewIssue());
          }
        }, 1000);
        
        return setBadFix(true);
      }
    }
  }, [currentIssue, gameOver, currentSteps]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let seconds = Math.round((gameEnd - Date.now()) / 1000);
      if (seconds <= 0) {
        seconds = 0;
        if (started) {
          clearInterval(intervalId);
          setGameOver(true);
          setCurrentIssue([
            {
              name: "GAME OVER!",
            },
          ]);
        }
      }
      setSecondsLeft(seconds);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameEnd, started]);

  return (
    <div className={styles.game}>
      <img className={styles.background} src={bg} alt="background" />
      <Steps steps={fixes} selectedStep={selectedStep} />

      {gameOver &&
        <ResultBox score={score} />
      }

      {!gameOver &&
        <IssueBox currentIssue={currentIssue} />
      }

      {started && !gameOver &&
        <ScoreBox score={score} secondsLeft={secondsLeft}/>
      }
      
    </div>
  );
}

export default Game