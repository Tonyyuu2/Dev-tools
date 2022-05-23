import React, { useState, useEffect, useContext } from 'react';
import classes from './TodoList.module.css';
import AuthContext from '../store/auth-context';
import Task from './Task';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FaCheck } from 'react-icons/fa';

const TodoList = () => {

  const [showModel, setShowModel] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const authCtx = useContext(AuthContext);

  //loading all the tasks on component mount
  useEffect(() => {

    axios.get('/api/tasks', { headers: { authorization: "Bearer " + authCtx.token } })
      .then((result) => setTasks(result.data))
      .catch(e => console.error(e));

  }, [authCtx.token]);

  //saving the task on the server with 'todo' status
  const handleSave = (e) => {
    e.preventDefault();
    if (!taskName) {
      setShowModel(false);
      return;
    }
    //hides the form to add new task
    setShowModel(false);

    axios.post('/api/tasks', { desc: taskName }, { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => setTasks(prev => [...prev, (result.data)]))
      .catch(e => console.error(e));

    //clear the input after submitting the task
    setTaskName('');
  };

  //removing the current task from server and client
  const handleDelete = (id) => {

    axios.delete(`/api/tasks/${id}`, { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(e => console.error(e));

  };

  //updating status of the task that's being dragged
  //reactBeautifulDnD function
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

    //updating status of the task on the server
    axios.put('/api/tasks', { id: taskId, status: status }, { headers: { authorization: "Bearer " + authCtx.token } })
      .then(result => setTasks(updatedTask))
      .catch(e => console.error(e));

  };

  return (

    <DragDropContext onDragEnd={ onDragEnd }>
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