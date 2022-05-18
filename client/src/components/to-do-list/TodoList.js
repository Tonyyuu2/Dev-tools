import React, { useState } from 'react';
import classes from './TodoList.module.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FaCheck } from 'react-icons/fa';

const demoData = [
  {
    id: 1,
    description: 'Build specs for the project',
    status: 'todo'
  },
  {
    id: 2,
    description: 'Create project skeleton',
    status: 'inprogress'
  },
  {
    id: 3,
    description: 'Attend meeting with ceo',
    status: 'done'
  },
  {
    id: 4,
    description: 'Talk to client for requirements',
    status: 'todo'
  }
];
const TodoList = () => {

  const [showModel, setShowModel] = useState(false);
  const [taskList, setTaskList] = useState(demoData);
  const [taskName, setTaskName] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!taskName) {
      setShowModel(false);
      return;
    }
    setShowModel(false);
    setTaskList(prev => {
      return [...prev, { id: Math.floor(Math.random() * 100) + 4, status: 'todo', description: taskName }];
    });
    setTaskName('');
  };

  const handleDelete = (id) => {

    const updatedTasks = taskList.filter(task => task.id !== id);
    setTaskList(updatedTasks);

  };

  const onDragEnd = (result) => {

    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;



    let updatedTask = taskList.map(task => {
      if (task.id === Number(draggableId)) {
        task.status = destination.droppableId;
      }
      return task;
    });

    setTaskList(updatedTask);


  };

  return (

    <DragDropContext onDragEnd={ onDragEnd }>
      {/* <h1 className={ classes.container__header }>To Do</h1> */}
      <div className={ classes.container }>
        <Droppable droppableId='todo'>
          {
            (provided, snapshot) => (
              <div
                ref={ provided.innerRef }
                className={ `${classes.todos__col} ${classes.todocontainer} ${snapshot.isDraggingOver ? classes.dragtodo : ''}` }
                { ...provided.droppableProps }
              >
                <div className={ classes.add__block }>
                  <span className={ classes.todos__header }>
                    To-do
                  </span>
                  <button className={ classes.todos__add } onClick={ () => setShowModel(true) }>+</button>
                </div>
                { showModel && <form className={ classes.add__block }>
                  <input className={ classes.todos__searchBox } name='task' value={ taskName } onChange={ (e) => { setTaskName(e.target.value); } }>
                  </input>
                  <button className={ classes.add_btn } onClick={ handleSave }><FaCheck style={{marginLeft: "5px", marginTop: "15px", color: "rgb(52, 52, 52)"}}/></button>
                </form> }

                { taskList.filter(task => task.status === 'todo')
                  .map((task, index) =>
                    <Task
                      key={ task.id }
                      description={ task.description }
                      id={ task.id }
                      type='todo'
                    />)
                }
                { provided.placeholder }
              </div>
            )
          }
        </Droppable>

        <Droppable droppableId='inprogress'>
          {
            (provided, snapshot) => (
              <div
                ref={ provided.innerRef }
                className={ `${classes.todos__col} ${classes.inprogresscontainer} ${snapshot.isDraggingOver ? classes.draginprogress : ''}` }
                { ...provided.droppableProps }
              >
                <span className={ classes.todos__header }>
                  Doing
                </span>
                { taskList.filter(task => task.status === 'inprogress')
                  .map((task, index) =>
                    <Task
                      key={ task.id }
                      description={ task.description }
                      id={ task.id }
                      type='inprogress'
                    />)
                }
                { provided.placeholder }
              </div>
            )
          }
        </Droppable>

        <Droppable droppableId='done'>
          {
            (provided, snapshot) => (
              <div
                ref={ provided.innerRef }
                className={ `${classes.todos__col} ${classes.donecontainer} ${snapshot.isDraggingOver ? classes.dragdone : ''}` }
                { ...provided.droppableProps }
              >
                <span className={ classes.todos__header }>
                  Done
                </span>
                { taskList.filter(task => task.status === 'done')
                  .map((task, index) => <Task
                    key={ task.id }
                    description={ task.description }
                    id={ task.id }
                    type='done'
                    onDelete={ () => handleDelete(task.id) }
                  />)
                }
                { provided.placeholder }
              </div>
            )
          }
        </Droppable>

      </div >
    </DragDropContext >

  );
};

export default TodoList;