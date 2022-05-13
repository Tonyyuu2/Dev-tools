import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('');

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }


    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["Name"] = taskName
        taskObj["Description"] = description
        taskObj["State"] = state
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>CREATE A TASK</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Task Title</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="state">Status</label>
                            <select id="state" name="state">
                            <option value="ToDo">ToDo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                
            </ModalBody>
            <ModalFooter className="d-flex justify-content-between">
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            <Button color="primary" onClick={handleSave} >Create</Button>{' '}
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;