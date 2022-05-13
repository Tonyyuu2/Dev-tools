import classes from './JournalItem.module.css';

import React from 'react';

const JournalItemTag = ({ variant, children }) => {
  return (
    <div className={ classes.tag + " " + classes[variant] }>
      { children }
    </div>
  );
};

export default JournalItemTag;