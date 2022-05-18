import React, { useState } from "react";
import classes from "./Details.module.css";
import ReactDom from "react-dom";
import axios from 'axios';

const Details = (props) => {

  console.log(props);

  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [code, setCode] = useState(props.tags.includes("code"));
  const [danger, setDanger] = useState(props.tags.includes("danger"));
  const [normal, setNormal] = useState(props.tags.includes("normal"));

  const date = new Date(props.date_created);

  const handleSubmit = (event) => {
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
    setShowEdit(false);
    props.closeModal(false);

    axios.put(`/api/journal/${props.id}`, newObj)
      .then(result => props.onUpdate(props.id, result.data))
      .catch(e => console.error(e));

  };

  const handleDelete = (event) => {
    event.preventDefault();
    props.closeModal(false);
    axios.delete(`/api/journal/${props.id}`)
      .then(result => props.onDelete(props.id))
      .catch(e => console.error(e));
  };

  return ReactDom.createPortal(
    <div className={ classes.background }>
      <div className={ classes.container }>
        <div className={ classes.buttondiv }>
          <input
            className={ classes.xbutton }
            type="button"
            value="X"
            onClick={ () => {
              props.closeModal(false);
            } }
          ></input>
          <input
            className={ classes.editbutton }
            type="button"
            value="Edit"
            onClick={ () => {
              setShowEdit(true);
            } }
          ></input>
        </div>
        <div className={ classes.date }>
          <div className={ classes.date_month }>
            { date.toLocaleString("en-US", { month: "long" }) }
          </div>
          <div className={ classes.date_year }>
            { date.toLocaleString("en-US", { day: "2-digit" }) }
          </div>
          <div className={ classes.date_day }>{ date.getFullYear() }</div>
        </div>
        <div className={ classes.header }></div>
        <div className={ classes.detailscontainer }>
          { showEdit ? <h3>Edit Entry:</h3> : null }
          { showEdit ? (
            <form className={ classes.entries }>
              <label>Title:</label>
              <div>
                <input
                  name="title"
                  type="text"
                  value={ title }
                  onChange={ (event) => setTitle(event.target.value) }
                ></input>
              </div>
            </form>
          ) : (
            <div className={ classes.title }>
              <h3 className={ classes.entry_header }>{ props.title }</h3>
            </div>
          ) }
          <div className={ classes.tags }></div>
          <label>Description:</label>
          { showEdit ? (
            <form className={ classes.entries }>
              <textarea
                name="description"
                autoComplete="off"
                rows="5"
                cols="40"
                wrap="hard"
                value={ description }
                onChange={ (event) => setDescription(event.target.value) }
              ></textarea>
            </form>
          ) : (
            <div className={ classes.textformat }>
              <p className={ classes.description }>{ props.description }</p>
            </div>
          ) }

          { showEdit ? (
            <div className={ classes.checkbox }>
              <input
                type="checkbox"
                name="code"
                value="code"
                checked={ code }
                onChange={ (event) => setCode(event.target.checked) }
              />
              <label>code</label>

              <input
                type="checkbox"
                name="danger"
                value="danger"
                checked={ danger }
                onChange={ (event) => setDanger(event.target.checked) }
              />
              <label>danger</label>

              <input
                type="checkbox"
                name="normal"
                value="normal"
                checked={ normal }
                onChange={ (event) => {
                  setNormal(event.target.checked);
                } }
              />
              <label>normal</label>
            </div>
          ) : null }
          { showEdit ? (
            <div>
              <button type="button" onClick={ handleSubmit }>
                Submit
              </button>
            </div>
          ) : null }
          <div>
            <button type="button" onClick={ handleDelete }>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("detail")
  );
};

export default Details;
