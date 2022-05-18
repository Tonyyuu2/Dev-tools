import React, { useState } from "react";
import classes from "./Details.module.css";
import ReactDom from "react-dom";

function Details(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  console.log("title :", title);
  const [description, setDescription] = useState(props.description);
  console.log("description :", description);
  const [code, setCode] = useState(props.tags.includes("code"));
  console.log("code :", code);
  const [danger, setDanger] = useState(props.tags.includes("danger"));
  console.log("danger :", danger);
  const [normal, setNormal] = useState(props.tags.includes("normal"));
  console.log("normal :", normal);

  function handleSubmit(event) {
    event.preventDefault();
    const tags = [];
    if (code) {
      tags.push("code");
    }
    if (danger) {
      tags.push("danger");
    }
    if (normal) {
      tags.push("normal");
    }
    const newObj = {
      title,
      description,
      tags,
    };
    props.data.push(newObj);
    console.log("---------------Hello------------");
    console.log("props.data :", props.data);
    setShowEdit(false);
    props.closeModal(false);
  }

  function handleDelete(event) {
    event.preventDefault();

    const newObj = {
      title: null,
      description: null,
      tags: null,
    };
    props.data.push(newObj);
    console.log("props.data :", props.data);
    props.closeModal(false);
  }

  return ReactDom.createPortal(
    <div className={classes.background}>
      <div className={classes.container}>
        <div className={classes.buttondiv}>
          <input
            className={classes.xbutton}
            type="button"
            value="X"
            onClick={() => {
              props.closeModal(false);
            }}
          ></input>
          <input
            className={classes.editbutton}
            type="button"
            value="Edit"
            onClick={() => {
              setShowEdit(true);
            }}
          ></input>
        </div>
        <div className={classes.date}>
          <div className={classes.date_month}>
            {props.date.toLocaleString("en-US", { month: "long" })}
          </div>
          <div className={classes.date_year}>
            {props.date.toLocaleString("en-US", { day: "2-digit" })}
          </div>
          <div className={classes.date_day}>{props.date.getFullYear()}</div>
        </div>
        <div className={classes.header}></div>
        <div className={classes.detailscontainer}>
          {showEdit ? <h3>Edit Entry:</h3> : null}
          {showEdit ? (
            <form className={classes.entries}>
              <label>Title:</label>
              <div>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                ></input>
              </div>
            </form>
          ) : (
            <div className={classes.title}>
              <h3 className={classes.entry_header}>{props.title}</h3>
            </div>
          )}
          <div className={classes.tags}></div>
          <label>Description:</label>
          {showEdit ? (
            <form className={classes.entries}>
              <textarea
                name="description"
                autoComplete="off"
                rows="5"
                cols="40"
                wrap="hard"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </form>
          ) : (
            <div className={classes.textformat}>
              <p className={classes.description}>{props.description}</p>
            </div>
          )}

          {showEdit ? (
            <div className={classes.checkbox}>
              <input
                type="checkbox"
                name="code"
                value="code"
                checked={code}
                onChange={(event) => setCode(event.target.checked)}
              />
              <label>code</label>

              <input
                type="checkbox"
                name="danger"
                value="danger"
                checked={danger}
                onChange={(event) => setDanger(event.target.checked)}
              />
              <label>danger</label>

              <input
                type="checkbox"
                name="normal"
                value="normal"
                checked={normal}
                onChange={(event) => {
                  setNormal(event.target.checked);
                }}
              />
              <label>normal</label>
            </div>
          ) : null}
          {showEdit ? (
            <div>
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          ) : null}
          <div>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("detail")
  );
}

export default Details;
