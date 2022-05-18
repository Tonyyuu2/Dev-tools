import React, { useState } from "react";
import styles from "./Form.module.css";
import ReactDom from 'react-dom';
import {FaRegSave, FaRegWindowClose} from "react-icons/fa"

function Form({closeModal, data}) {
  const [title, setTitle] = useState("");
  console.log("title :", title);
  const [description, setDescription] = useState("");
  console.log("description :", description);
  const [details, setDetails] = useState("");
  console.log("details :", details);
  const [code, setCode] = useState(false);
  console.log("code :", code);
  const [danger, setDanger] = useState(false);
  console.log("danger :", danger);
  const [normal, setNormal] = useState(false);
  console.log("normal :", normal);

  function handleSubmit(event) {
    event.preventDefault();

    const tags = [];

    if(code) {
      tags.push("code")
    }
    if(danger) {
      tags.push("danger")
    }
    if(normal) {
      tags.push("normal")
    }

    const newObj = {
      title, 
      description,
      tags
    }
    data.push(newObj)
    closeModal(false)
    console.log('data :', data);
  }


  return ReactDom.createPortal(
    <>
      <div className={styles.background}>
        <div className={styles.layout}>
          <form className={styles.formContainer}>
          <div className={styles.button}>
              <button className={styles.cancelButton} type="button"  onClick={() => {closeModal(false)}}><FaRegWindowClose/></button>
          </div>
            <h2 className={styles.newentry}>New Journal</h2>
            <div className={styles.formlayout}>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Journal Title"
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formlayout}>
              <textarea
                required
                name="description"
                autoComplete="off"
                rows="5"
                cols="30"
                wrap="hard"
                placeholder="Write a short description of the code you wrote today."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={styles.inputField}
              />
            </div>
            <div className={styles.radio}>
              <input
                type="checkbox"
                name="radio"
                value="code"
                checked={code}
                onChange={(event) => setCode(event.target.checked)}
                className={styles.radioBox}
              />
              <label>code</label>

              <input
                type="checkbox"
                name="radio"
                value="danger"
                checked={danger}
                onChange={(event) => setDanger(event.target.checked)}
                className={styles.radioBox}
              />
              <label>danger</label>

              <input
                type="checkbox"
                name="radio"
                value="normal"
                checked={normal}
                onChange={(event) => setNormal(event.target.checked)}
                className={styles.radioBox}
              />
              <label>normal</label>
            </div>
              <div className={styles.saveButtonContainer}>
              <button className={styles.saveButton} type="button" onClick={handleSubmit}>
              Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default Form;
