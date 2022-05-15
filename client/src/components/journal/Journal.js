import JournalItem from "./JournalItem";
import classes from './JournalItem.module.css';

import React from 'react';

const data = [{
  title: "Implemented code journal feature",
  description: "About A large dataset of 4.2m Java source code and parallel data of their description from code search, and code summarization studies.",
  date: "May 11, 2022",
  tags: ['code', 'danger', 'normal']
}, {
  title: "Helped onboarding junior developers",
  description: "A fun day with new developers. Introduction to company value and culture. Also saw them the tech stack that we use.",
  date: "2022-04-03",
  tags: ['normal']
}, {
  title: "A day from the hell",
  description: "Servers crashed and we lost all of our data.",
  date: "2022-02-11",
  tags: ['danger']
}, {
  title: "No work today",
  description: "Fun meet and greet with all the techies from our city.",
  date: "2022-01-26",
  tags: []
}];

const journaEntryList = data.map((entry, index) => <JournalItem key={ index } { ...entry } />);

const Journal = () => {
  return (
    <section>
      <div className={ classes.main }>
        <div className={ classes.header }>
          <h2>My Journal</h2>
          <button className={ classes.journalbtn }>
            <img src="https://img.icons8.com/office/25/000000/pencil--v1.png" alt='pencil' />
          </button>
        </div>

        { journaEntryList }
      </div>
    </section >
  );
};

export default Journal;