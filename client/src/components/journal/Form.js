import React, { useState } from "react";
import styles from "./Form.module.css";
import ReactDom from 'react-dom';
import axios from 'axios';
import { FaRegWindowClose } from "react-icons/fa";


const Form = ({ closeModal, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [data, setData] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    const tags = [];

    if (front) {
      tags.push("front");
    }
    if (back) {
      tags.push("back");
    }
    if (data) {
      tags.push("data");
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
          <form className={ styles.formContainer }>
            <div className={ styles.button }>
              <button className={ styles.cancelButton } type="button" onClick={ () => { closeModal(false); } }><FaRegWindowClose /></button>
            </div>
            <h2 className={ styles.newentry }>New Journal</h2>
            <div className={ styles.formlayout }>
              <input
                type="text"
                value={ title }
                onChange={ (event) => setTitle(event.target.value) }
                placeholder="Journal Title"
                required
                className={ styles.inputField }
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
                placeholder="Write a short description of the code you wrote today."
                value={ description }
                onChange={ (event) => setDescription(event.target.value) }
                className={ styles.inputField }
              />
            </div>
            <div className={ styles.radio }>
              <input
                type="checkbox"
                name="radio"
                value="front"
                checked={ front }
                onChange={ (event) => setFront(event.target.checked) }
                className={ styles.radioBox }
              />
              <label>front</label>

              <input
                type="checkbox"
                name="radio"
                value="back"
                checked={ back }
                onChange={ (event) => setBack(event.target.checked) }
                className={ styles.radioBox }
              />
              <label>back</label>

              <input
                type="checkbox"
                name="radio"
                value="data"
                checked={ data }
                onChange={ (event) => setData(event.target.checked) }
                className={ styles.radioBox }
              />
              <label>data</label>
            </div>
            <div className={ styles.saveButtonContainer }>
              <button className={ styles.saveButton } type="button" onClick={ handleSubmit }>
                Save
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
