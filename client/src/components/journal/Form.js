import React, { useState } from "react";
import styles from "./Form.module.css";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function Form() {
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

  const [value, setValue] = useState(undefined);
  console.log("value :", value);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setDetails("")
    setCode(false);
    setDanger(false);
    setNormal(false);
    handleChange(undefined);
  };

  return (
    <>
      <div className={styles.create}>
        <form>
          <h2>What'd you get up to today?</h2>
          <label>Journal Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
          <label>Short description:</label>
          <textarea
            required
            name="description"
            autoComplete="off"
            rows="5"
            cols="30"
            wrap="hard"
            placeholder="A short description of your journal."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label>Journal details:</label>
          <textarea
            required
            name="details"
            autoComplete="off"
            rows="5"
            cols="30"
            wrap="hard"
            placeholder="Write about your endeavors."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
          <div className={styles.radio}>
            <input
              type="checkbox"
              name="radio"
              value="code"
              checked={code}
              onChange={(event) => setCode(event.target.checked)}
            />
            <label>code</label>

            <input
              type="checkbox"
              name="radio"
              value="danger"
              checked={danger}
              onChange={(event) => setDanger(event.target.checked)}
            />
            <label>danger</label>

            <input
              type="checkbox"
              name="radio"
              value="normal"
              checked={normal}
              onChange={(event) => setNormal(event.target.checked)}
            />
            <label>normal</label>
          </div>
          <br />
          <div>
            <Rating
              name="highlight-selected-only"
              defaultValue={value}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              value={value}
              onChange={(event) => handleChange(event.target.value)}
            />
          </div>
          <div className={styles.button}>
            <button type="button" className="btn btn-primary">
              Done
            </button>

            <button type="button" className="btn btn-danger" onClick={reset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
