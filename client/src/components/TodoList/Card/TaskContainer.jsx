import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from './TaskContainer.module.css'
import EditTask from '../Form/EditTask'


const TaskContainer = ({deleteTask, updateTasks, taskObj, index}) => {
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    deleteTask(index);
  }

  const updateTask = (obj) => {
    updateTasks(obj, index)
  }

  const toggle = () => {
    setModal(!modal);
  }


 return (
  <div className = {`mr-5 ${styles.cardWrapper}`} >
  <div className = "cardTop" >
  <span className = {styles.cardHeader}></span>
  </div>
  <i className={styles.cardTitle}></i>
  <div className = {styles.taskHolder}>

      {/* <p className = "mt-3">{taskObj.title}</p> */}

      {/* <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
          <FontAwesomeIcon icon={faEdit} style={{"cursor":"pointer"}} onClick = {() => setModal(true)} />
          <FontAwesomeIcon icon={faTrashAlt} style={{"cursor":"pointer"}} onClick = {handleDelete}  />
      </div> */}
</div>
<EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
</div>

 )
}

export default TaskContainer