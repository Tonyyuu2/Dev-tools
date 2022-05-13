import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import EditTaskPopup from './modal/EditTask'
import styles from './TodoList.module.css'

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div className = {`mr-5 ${styles.cardWrapper}`} >
            <div className = "cardTop" style={{"backgroundColor": colors[index%5].primaryColor}}>
            <span className = {styles.cardHeader}></span>
            </div>
            <i className={styles.cardTitle}>{taskObj.Name}</i>
            <div className = {styles.taskHolder}>
  
                <p className = "mt-3">{taskObj.Description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <FontAwesomeIcon icon={faEdit} style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)} />
                    <FontAwesomeIcon icon={faTrashAlt} style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}  />
                </div>
        </div>
        <EditTaskPopup modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;