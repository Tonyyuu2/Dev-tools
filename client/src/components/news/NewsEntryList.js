import React from "react";
import classes from "./NewsEntryList.module.css";

function NewsEntryList(props) {
  return (
    <>
    <div className={classes.body}>
    <a className={classes.atag} href={props?.link} target="_blank" rel="noreferrer">
      <div className={classes.section}>
      <div className={classes.source}>{props?.clean_url}</div>
      <div className={classes.subSection}>
        <div className={classes.imgTag}>
          {props?.title}
        </div>
          <img
            className={classes.thumbnail}
            src={props?.media}
            alt="thumbnail"
          />
        </div>
      </div>
      </a>
      </div>
    </>
  );
}

export default NewsEntryList;
