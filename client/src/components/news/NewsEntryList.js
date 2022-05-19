import React from "react";
import classes from "./NewsEntryList.module.css";

function NewsEntryList(props) {
  return (
    <>
    <div>
    <a className={classes.atag} href={props?.url} target="_blank" rel="noreferrer">


      <div className={classes.source}>{props?.source.name}</div>
      <div className={classes.imgTag}>
        {props?.title}
        <img
          className={classes.thumbnail}
          src={props?.urlToImage}
          alt="thumbnail"
          />
      </div>
      </a>
      </div>
    </>
  );
}

export default NewsEntryList;
