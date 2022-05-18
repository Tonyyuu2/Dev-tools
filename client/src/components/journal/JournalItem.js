import React, { useState } from 'react';
import JournalItemTag from './JournalItemTag';
import classes from './JournalItem.module.css';
import Details from './Details';


const JournalItem = (props) => {

  const [openModal, setOpenModal] = useState(false);

  const tagList = props.tags.map((tag, index) =>
    <JournalItemTag
      key={ index }
      variant={ tag }
      onFilter={ props.onFilter } >
      { tag }
    </JournalItemTag>);


  const date = new Date(props.date_created);

  return (
    <article>
      <div className={ classes.container } onClick={ () => { setOpenModal(true); } }>
        <div className={ classes.date }>
          <div className={ classes.date__month }>{ date.toLocaleString('en-US', { month: 'long' }) }</div>
          <div className={ classes.date__year }>{ date.toLocaleString('en-US', { day: '2-digit' }) }</div>
          <div className={ classes.date__day }>{ date.getFullYear() }</div>
        </div>
        <div className={ classes.body }>
          <div className={ classes.title }>
            <h3 className={ classes.entry_header }>{ props.title }</h3>
          </div>
          <div className={ classes.tags }>
            { tagList }
          </div>
        </div>
      </div>
      { openModal && <Details closeModal={ setOpenModal } { ...props } /> }
    </article>
  );
};

export default JournalItem;