import React, {useState} from 'react'
import classes from './EditForm.module.css'
import ReactDom from 'react-dom';

function EditForm(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description)
  const [details, setDetails] = useState(props.details);
  const [code, setCode] = useState(false);
  const [danger, setDanger] = useState(false);
  const [normal, setNormal] = useState(false);
  
  return ReactDom.createPortal(
    <div className={classes.background}>
      <div className={classes.container}>
      <input
        className={classes.xbutton}
        type="button"
        value="X"
        onClick={() => {
          props.closeModal(false);
        }}
      ></input>
        <div className={classes.header}></div>
        <div className={classes.date}>
          <div className={classes.date_month}>
            {props.date.toLocaleString("en-US", { month: "long" })}
          </div>
          <div className={classes.date_year}>
            {props.date.toLocaleString("en-US", { day: "2-digit" })}
          </div>
          <div className={classes.date_day}>{props.date.getFullYear()}</div>
        </div>
        <div className={classes.detailscontainer}>
          <div className={classes.title}>
            <h3 className={classes.entry_header}>{props.title}</h3>
          </div>
          <div className={classes.tags}></div>
          <label>Description:</label>
          <div className={classes.textformat}>
          <p className={classes.description}>{props.description}</p>
          </div>
            <label>Details:</label>
          <div className={classes.textformat}>
            <p className={classes.description}>{props.detail}</p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("Edit")
  );
}

export default EditForm