import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { 
  fas, faFont, faPlug, 
  faCodeBranch, faLink, 
  faFileAlt, faCog, faHammer, 
  faServer, faUpload, faComment,
  faComments } from "@fortawesome/free-solid-svg-icons";


import styles from './Steps.module.css'

library.add(
  fab, fas, faFont, 
  faPlug, faCodeBranch, 
  faLink, faFileAlt, 
  faNodeJs, faCog, faHammer, 
  faServer, faUpload, faComment,
  faComments)

const classNames = (...names) => names.join(' ')

const Steps = ({ steps, selectedStep }) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.steps)}>
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={classNames(
              styles.step,
              selectedStep === index ? styles.selected : ""
            )}
          >
            <FontAwesomeIcon icon={step.icon} size="2x" />
          </div>
        ))}
      </div>
      <div className={styles.info}>
        {steps[selectedStep] && steps[selectedStep].name}
      </div>
    </div>
  );
}

export default Steps