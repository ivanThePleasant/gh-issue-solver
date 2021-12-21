import React from "react";

import styles from './Steps.module.css'

const classNames = (...names) => names.join(' ')

const Steps = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.steps)}>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
        <div className={styles.step}></div>
      </div>
    </div>
  );
}

export default Steps