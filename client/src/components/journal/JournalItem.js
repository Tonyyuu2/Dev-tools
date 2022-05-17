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
        <div className={ classes.date }>
          <div className={ classes.date__month }>{ props.date.toLocaleString('en-US', { month: 'long' }) }</div>
          <div className={ classes.date__day }>{ props.date.toLocaleString('en-US', { day: '2-digit' }) }</div>
          <div className={ classes.date__yaer }>{ props.date.getFullYear() }</div>
        </div>
        <div className={ classes.body }>
          <div className={ classes.title }>
            <h3 className={ classes.entry_header }>{ props.title }</h3>
          </div>
          <div className={ classes.tags }>
            { tagList }
          </div>
          {/* <p className={ classes.description }>{ props.description }</p> */}
        </div>
      </div>
    </article>
  );
};

export default JournalItem;