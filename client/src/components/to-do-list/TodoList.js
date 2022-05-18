import React, { useState, useEffect } from 'react';
import classes from './TodoList.module.css';
import Task from './Task';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FaCheck } from 'react-icons/fa';

const TodoList = () => {

  const [showModel, setShowModel] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    axios.get('/api/tasks')
      .then((result) => setTasks(result.data))
      .catch(e => console.error(e));

  }, []);


  const handleSave = (e) => {
    e.preventDefault();
    if (!taskName) {
      setShowModel(false);
      return;
    }
    setShowModel(false);

    axios.post(`/api/tasks?desc=${taskName}`)
      .then(result => setTasks(prev => [...prev, (result.data)]))
      .catch(e => console.error(e));

    setTaskName('');
  };

  const handleDelete = (id) => {
    console.log(typeof id, id);
    axios.delete(`/api/tasks/${id}`)
      .then(result => {
        console.log("tasks", tasks);
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(e => console.error(e));



    /*  axios.get('/api/tasks')
       .then((result) => setTasks(result.data))
       .catch(e => console.error(e)); */

  };

  const onDragEnd = (result) => {

    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const taskId = Number(draggableId);
    const status = destination.droppableId;
    const updatedTask = tasks.map(task => {
      if (task.id === taskId) {
        task.status = status;
      }
      return task;
    });

    axios.put(`/api/tasks?id=${taskId}&status=${status}`)
      .then(result => setTasks(updatedTask))
      .catch(e => console.error(e));

  };

  return (

    <DragDropContext onDragEnd={ onDragEnd }>
      {/* <h1 className={ classes.container__header }>To Do</h1> */ }
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
                  <button className={ classes.add_btn } onClick={ handleSave }><FaCheck style={ { marginLeft: "5px", marginTop: "15px", color: "rgb(52, 52, 52)" } } /></button>
                </form> }

                { tasks.filter(task => task.status === 'todo')
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
                { tasks.filter(task => task.status === 'inprogress')
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
                { tasks.filter(task => task.status === 'done')
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