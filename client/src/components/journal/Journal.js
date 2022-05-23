import React, { useEffect, useState, useContext } from "react";
import JournalItem from "./JournalItem";
import AuthContext from "../store/auth-context";
import Form from "./Form";
import { FaRegEdit } from "react-icons/fa";
import classes from "./JournalItem.module.css";
import axios from "axios";

const Journal = () => {
  //state for each mutable variable:
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    //fetches the current journal data on render, changes when the token value is changed
    axios
      .get("/api/journal", {
        headers: { authorization: "Bearer " + authCtx.token },
      })
      .then((result) => setData(result.data))
      .catch((e) => console.error(e));
  }, [authCtx.token]);

  // fn that prepends new journal entries to the previous  state
  const handleSave = (newEntry) => {
    setData((prev) => [newEntry, ...prev]);
  };
  // fn that filters through the data and creates a new array of entries without the current entry's ID
  const handleUpdate = (id, updatedEntry) => {
    const entryList = data.filter((entry) => entry.id !== id);
    setData([updatedEntry, ...entryList]); //prepends the new journal entry with the same ID to the entry list
  };
  //fn that returns a copy of the current data with the specific ID redacted
  const handleDelete = (id) => {
    const entryList = data.filter((entry) => entry.id !== id);
    setData([...entryList]);
  };
  //fn that returns journal entries with the specified tag
  const handleFilter = (filterTag) => {
    setFilter(true);
    axios
      .get("/api/journal", {
        headers: { authorization: "Bearer " + authCtx.token },
      })
      .then((result) => {
        const entryList = result.data.filter((entry) =>
          entry.tags.includes(filterTag)
        );
        setData([...entryList]);
      })
      .catch((e) => console.error(e));
  };
  //fn that fetches and returns all of the current journal entries
  const handleReset = () => {
    setFilter(false);
    axios
      .get("/api/journal", {
        headers: { authorization: "Bearer " + authCtx.token },
      })
      .then((result) => setData(result.data))
      .catch((e) => console.error(e));
  };
  // a variable that maps through the data array and generates a JournalItem component for each entry
  const journaEntryList = data.map((entry) => (
    <JournalItem
      key={entry.id}
      {...entry}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onFilter={handleFilter}
    />
  ));

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        {openModal && <Form closeModal={setOpenModal} onAdd={handleSave} />}
        <h2 className={classes.headerText}>Code Journal</h2>

        <FaRegEdit
          className={classes.journalbtn}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      {filter && <button onClick={handleReset}>Show All</button>}
      {journaEntryList}
    </div>
  );
};

export default Journal;
