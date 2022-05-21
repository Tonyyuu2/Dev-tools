import React from "react";
import styles from "../../App.module.css";
import classes from "./About.module.css";
import Tony from "./assets/Tony.png";
import Lucky from "./assets/Lucky.png";
import Shubham from "./assets/Shubham.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function About() {
  return (
    <>
      <div className={ styles.global_bg }>
        <header className={ classes.header }>
          <div className={ classes.missionstatement }>
            <i>DevTools is an app designed to help developers be productive and stay productive. We wanted to provide a space where devs have access to a suite of tools ready-to-go without the nuisance of tabbing from window to window. Our tools are tailor-made to make a dev’s life easier so they can focus on what’s important: writing code, and building great software.</i>
          </div>
          <div className={ classes.borderforheader }></div>
        </header>
        <div className={ classes.cards }>
          <div className={ classes.container }>
            <div>
              <img src={ Tony } className={ classes.img } alt='headshot'></img>
            </div>
            <div className={ classes.name }>
              <h2>Tony</h2>
            </div>
            <div className={classes.description}>Full Stack Web Developer</div>
            <i className={classes.quote}>"Things aren’t always #000000 and #FFFFFF"</i>
            <IconContext.Provider value={{ color: "grey", size: "30px" }}>
              <div className={classes.atag}>
                <a
                  href="https://github.com/Tonyyuu2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className={ classes.icon } />
                </a>
                <a
                  href="https://www.linkedin.com/in/tony-yu-23676a212/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className={ classes.icon } />
                </a>
              </div>
            </IconContext.Provider>
          </div>
          <div className={ classes.container }>
            <div>
              <img src={ Shubham } className={ classes.img } alt='headshot'></img>
            </div>
            <div className={ classes.name }>
              <h2>Shubham</h2>
            </div>
            <div className={classes.description}>Full Stack Web Developer</div>
            <i className={classes.quote}>"If at first you don’t succeed; call it version 1.0"</i>
            <IconContext.Provider value={{ color: "grey", size: "30px" }}>
              <div className={classes.atag}>
                <a
                  href="https://github.com/shubham2295"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className={ classes.icon } />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubham-patel-22sm95/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className={ classes.icon } />
                </a>
              </div>
            </IconContext.Provider>
          </div>
          <div className={ classes.container }>
            <div>
              <img src={ Lucky } className={ classes.img } alt='headshot'></img>
            </div>
            <div className={ classes.name }>
              <h2>Lucky</h2>
            </div>
            <div className={classes.description}>Full Stack Web Developer</div>
            <i className={classes.quote}>"Nine people can't make a baby in a month"</i>
            <IconContext.Provider value={{ color: "grey", size: "30px" }}>
              <div className={classes.atag}>
                <a
                  href="https://github.com/lucky-hw-kim"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className={ classes.icon } />
                </a>
                <a
                  href="https://www.linkedin.com/in/luckykim/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className={ classes.icon } />
                </a>
              </div>
            </IconContext.Provider>
            <div className={ classes.spacer }></div>
          </div>
        </div>
      </div>
    </>
  );
}
