import React from "react";
import styles from "../../App.module.css";
import classes from "./About.module.css";
import Tony from "./assets/Tony.jpg";
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <>
      <div className={styles.global_bg}>
        <header className={classes.header}>
          <h1>For Devs</h1>
          <h1>By Devs</h1>
          <div className={classes.borderforheader}></div>
        </header>
        <div className={classes.container}>
          <div>
            <img src={Tony} className={classes.img}></img>
          </div>
          <div className={classes.name}>
            <h2>Tony</h2>
          </div>
          <div className={classes.description}>Full Stack Web Developer</div>
          <div className={classes.atag}>
            <a
              href="https://github.com/Tonyyuu2"
              target="_blank"
              rel="noreferrer"
              className={classes.atag}
            >
              <FaGithub className={classes.icon} size={50}/>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
