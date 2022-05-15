import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classes from './TodoList.module.css';

const Task = (props) => {
  return (
    <Draggable draggableId={ props.id.toString() } index={ props.id }>

      {
        (provided, snapshot) => (
          <div
            ref={ provided.innerRef }
            className={ `${classes.task} ${classes[props.type]} ${snapshot.isDragging ? classes.taskdrag : ''}` }
            { ...provided.draggableProps }
            { ...provided.dragHandleProps }
          >
            { props.type === 'done' && <button
              className={ classes.cancelbtn }
              onClick={ props.onDelete }
            >❌</button> }
            <div>{ props.description }</div>

          </div>
        )
      }

    </Draggable>
  );
};

export default Task;