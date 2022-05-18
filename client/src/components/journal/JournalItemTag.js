import classes from './JournalItem.module.css';
import React from 'react';

const JournalItemTag = ({ variant, children, onFilter }) => {
  return (
    <button
      className={ `${classes.tag} ${classes[variant]}` }
      onClick={ (e) => {
        e.stopPropagation();
        onFilter(variant);
      } }>
      { children }
    </button>
  );
};

export default JournalItemTag;