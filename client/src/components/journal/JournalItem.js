import React from 'react';
import JournalItemTag from './JournalItemTag';
import classes from './JournalItem.module.css';


const JournalItem = (props) => {

  const tagList = props.tags.map((tag, index) =>
    <JournalItemTag
      key={ index }
      variant={ tag } >
      { tag }
    </JournalItemTag>);

  return (
    <article>
      <div className={ classes.container }>
        <div className={ classes.title }>
          <h3>{ props.title }</h3>
          <p>{ props.date }</p>
        </div>
        <div className={ classes.tags }>
          { tagList }
        </div>
        <p>{ props.description }</p>
      </div>
    </article>
  );
};

export default JournalItem;