import React, { useState } from "react";
import styles from "./Form.module.css";
import ReactDom from 'react-dom';
import axios from 'axios';

const Form = ({ closeModal, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState(false);
  const [danger, setDanger] = useState(false);
  const [normal, setNormal] = useState(false);


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
      tags
    };

    axios.post('/api/journal', newObj)
      .then(result => onAdd(result.data))
      .catch(e => console.error(e));

    closeModal(false);

  };


  return ReactDom.createPortal(
    <>
      <div className={ styles.background }>
        <div className={ styles.layout }>
          <form>
            <input className={ styles.xbutton } type="button" value="X" onClick={ () => { closeModal(false); } }></input>
            <h2 className={ styles.newentry }>New Entry:</h2>
            <div className={ styles.formlayout }>
              <input
                type="text"
                value={ title }
                onChange={ (event) => setTitle(event.target.value) }
                placeholder="Title:"
                required
              />
            </div>
            <div className={ styles.formlayout }>
              <textarea
                required
                name="description"
                autoComplete="off"
                rows="5"
                cols="30"
                wrap="hard"
                placeholder="A short description of your journal."
                value={ description }
                onChange={ (event) => setDescription(event.target.value) }
              />
            </div>
            <div className={ styles.radio }>
              <input
                type="checkbox"
                name="radio"
                value="code"
                checked={ code }
                onChange={ (event) => setCode(event.target.checked) }
              />
              <label>code</label>

              <input
                type="checkbox"
                name="radio"
                value="danger"
                checked={ danger }
                onChange={ (event) => setDanger(event.target.checked) }
              />
              <label>danger</label>

              <input
                type="checkbox"
                name="radio"
                value="normal"
                checked={ normal }
                onChange={ (event) => setNormal(event.target.checked) }
              />
              <label>normal</label>
            </div>
            <div className={ styles.button }>
              <button type="button" onClick={ handleSubmit }>
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Form;
