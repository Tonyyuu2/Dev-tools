<<<<<<< HEAD
import JournalItem from "./JournalItem";
import Form from "./Form";
import { FaRegEdit } from "react-icons/fa";
import classes from './JournalItem.module.css';
import React, { useEffect, useState } from 'react';
const axios = require('axios');


=======
import Form from "./Form";
import { FaRegEdit } from "react-icons/fa";
import JournalItem from "./JournalItem";
import classes from "./JournalItem.module.css";
import React, { useEffect, useState } from "react";
const axios = require("axios");
>>>>>>> fbe724e869b1e710a12f217d5601ef92ab086746

const Journal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/journal")
      .then((result) => setData(result.data))
      .catch((e) => console.error(e));
  }, []);

  const journaEntryList = data.map((entry, index) => (
    <JournalItem key={ index } { ...entry } />
  ));

  return (
    <div className={ classes.main }>
      <div className={ classes.header }>
        { openModal && <Form closeModal={ setOpenModal } data={ data } /> }
      </div>
      <div className={ classes.main }>
        <div className={ classes.header }>
          <h2 className={ classes.headerText }>Code Journal</h2>

          <FaRegEdit className={ classes.journalbtn } onClick={ () => {
            setOpenModal(true);
          } } />
        </div>
        { journaEntryList }
      </div>
    </div>
  );
};

export default Journal;
