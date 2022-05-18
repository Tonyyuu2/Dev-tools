import JournalItem from "./JournalItem";
import Form from "./Form";
import { FaRegEdit } from "react-icons/fa";
import classes from './JournalItem.module.css';
import React, { useEffect, useState } from 'react';
const axios = require('axios');

const Journal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios
      .get("/api/journal")
      .then((result) => setData(result.data))
      .catch((e) => console.error(e));
  }, []);



  const handleSave = (newEntry) => {
    setData(prev => [...prev, newEntry]);
  };

  const handleUpdate = (id, updatedEntry) => {
    const entryList = data.filter(entry => entry.id !== id);
    setData([...entryList, updatedEntry]);
  };

  const handleDelete = (id) => {
    const entryList = data.filter(entry => entry.id !== id);
    setData([...entryList]);
  };

  const handleFilter = (filterTag) => {
    setFilter(true);
    axios.get("/api/journal")
      .then((result) => {
        const entryList = result.data.filter(entry => entry.tags.includes(filterTag));
        setData([...entryList]);
      })
      .catch((e) => console.error(e));
  };

  const handleReset = () => {
    setFilter(false);
    axios
      .get("/api/journal")
      .then((result) => setData(result.data))
      .catch((e) => console.error(e));
  };

  const journaEntryList = data.map((entry) => (
    <JournalItem
      key={ entry.id } { ...entry }
      onUpdate={ handleUpdate }
      onDelete={ handleDelete }
      onFilter={ handleFilter } />
  ));

  return (
    <div className={ classes.main }>
      <div className={ classes.header }>
        { openModal && <Form closeModal={ setOpenModal } onAdd={ handleSave } /> }
        <h2 className={ classes.headerText }>Code Journal</h2>

        <FaRegEdit
          className={ classes.journalbtn }
          onClick={ () => { setOpenModal(true); } }
        />
      </div>
      { filter && <button onClick={ handleReset }>Show All</button> }
      { journaEntryList }
    </div>
  );
};

export default Journal;
