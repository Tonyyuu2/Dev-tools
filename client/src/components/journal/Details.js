import React, { useState, useContext } from "react";
import classes from "./Details.module.css";
import ReactDom from "react-dom";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { FaRegEdit, FaRegWindowClose, FaRegTrashAlt } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

const Details = (props) => {
  //state for each mutable variable:
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [front, setFront] = useState(props.tags.includes("front"));
  const [back, setBack] = useState(props.tags.includes("back"));
  const [data, setData] = useState(props.tags.includes("data"));
  const authCtx = useContext(AuthContext); //context provider

  const date = new Date(props.date_created);

  const handleSubmit = (event) => {
    event.preventDefault();
    const tags = []; //creates new array and adds front/back/data depending on the checkbox state
    if (front) {
      tags.push("front");
    }
    if (back) {
      tags.push("back");
    }
    if (data) {
      tags.push("data");
    }
    //creates a new object with the current state values
    const newObj = {
      title,
      description,
      tags,
    };
    setShowEdit(false); //onClick => close the edit page and the modal altogether
    props.closeModal(false);

    axios
      .put(`/api/journal/${props.id}`, newObj, {
        //override the values of the current ID
        headers: { authorization: "Bearer " + authCtx.token }, //requirement for jsonwebtoken
      })
      .then((result) => props.onUpdate(props.id, result.data)) //triggers the handleUpdate fn in Journal.js
      .catch((e) => console.error(e));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    props.closeModal(false);
    axios
      .delete(`/api/journal/${props.id}`, {
        // deletes data on current ID
        headers: { authorization: "Bearer " + authCtx.token },
      })
      .then((result) => props.onDelete(props.id)) //triggers the handleDelete fn in Journal.js
      .catch((e) => console.error(e));
  };

  //requirement to use Portal feature in React and create a modal
  return ReactDom.createPortal(
    <div className={classes.background}>
      <div className={classes.container}>
        <div className={classes.buttondiv}>
          <button
            className={classes.xbutton}
            type="button"
            onClick={() => {
              props.closeModal(false);
            }}
          >
            <FaRegWindowClose />
          </button>
        </div>
        <div className={classes.dateContainer}>
          <div className={classes.date}>
            <div className={classes.date_month}>
              {date.toLocaleString("en-US", { month: "long" })}
            </div>{" "}
            -
            <div className={classes.date_year}>
              {date.toLocaleString("en-US", { day: "2-digit" })}
            </div>{" "}
            -<div className={classes.date_day}>{date.getFullYear()}</div>
          </div>
        </div>
        <div className={classes.detailscontainer}>
          {showEdit ? (
            <form className={classes.entries}>
              <div>
                <input
                  className={classes.inputField}
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
          <div className={classes.descriptionLabel}>
            {/* <label>Description:</label> */}
          </div>
          {showEdit ? (
            <form className={classes.entries}>
              <textarea
                className={classes.inputField}
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
                className={classes.radioBox}
                type="checkbox"
                name="front"
                value="front"
                checked={front}
                onChange={(event) => setFront(event.target.checked)}
              />
              <label>front</label>

              <input
                className={classes.radioBox}
                type="checkbox"
                name="back"
                value="back"
                checked={back}
                onChange={(event) => setBack(event.target.checked)}
              />
              <label>back</label>

              <input
                className={classes.radioBox}
                type="checkbox"
                name="data"
                value="data"
                checked={data}
                onChange={(event) => {
                  setData(event.target.checked);
                }}
              />
              <label>data</label>
            </div>
          ) : null}
          <div className={classes.buttons}>
            <button
              type="button"
              onClick={handleDelete}
              className={classes.deletebutton}
            >
              <FaRegTrashAlt />
            </button>
            {showEdit ? (
              <button
                className={classes.submitbutton}
                type="button"
                onClick={handleSubmit}
              >
                <MdSaveAlt />
              </button>
            ) : null}
            {!showEdit ? (
              <button
                className={classes.editbutton}
                type="button"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                <FaRegEdit />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("detail") //refers to the root element overlay in index.js
  );
};

export default Details;
