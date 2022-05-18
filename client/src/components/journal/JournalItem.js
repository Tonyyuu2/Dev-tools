import React, { useState } from 'react';
import JournalItemTag from './JournalItemTag';
import classes from './JournalItem.module.css';
import Details from './Details';


const JournalItem = (props) => {

  const [openModal, setOpenModal] = useState(false);

  const { details } = props;

  const tagList = props.tags.map((tag, index) =>
    <JournalItemTag
      key={ index }
      variant={ tag } >
      { tag }
    </JournalItemTag>);

return (
  <article>
      <div onClick={() => {setOpenModal(true)}} className={ classes.container }>
        <div className={ classes.date }>
          <div className={ classes.date__month }>{ props.date.toLocaleString('en-US', { month: 'long' }) }</div>
          <div className={ classes.date__year }>{ props.date.toLocaleString('en-US', { day: '2-digit' }) }</div>
          <div className={ classes.date__day }>{ props.date.getFullYear() }</div>
        </div>
        <div>
          <div className={ classes.title }>
            <h3 className={ classes.entry_header }>{ props.title }</h3>
          </div>
          <div className={ classes.tags }>
            { tagList }
          </div>
        </div>
      </div>
      {openModal && <Details closeModal={ setOpenModal} {...props} data={props.data}/>}
    </article>
  );
};

export default JournalItem;