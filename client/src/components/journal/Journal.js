import JournalItem from "./JournalItem";
import classes from './JournalItem.module.css';
import React, { useEffect, useState } from 'react';
const axios = require('axios');

const Journal = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/journal')
      .then((result) => setData(result.data))
      .catch(e => console.error(e));
  }, []);

  const journaEntryList = data.map((entry, index) => <JournalItem key={ index } { ...entry } />);

  return (

    <div className={ classes.main }>
      <div className={ classes.header }>
        <h2>My Journal</h2>
        <button className={ classes.journalbtn }>
          <img src="https://img.icons8.com/office/25/000000/pencil--v1.png" alt='pencil' />
        </button>
      </div>

      { journaEntryList }
    </div>

  );
};

export default Journal;