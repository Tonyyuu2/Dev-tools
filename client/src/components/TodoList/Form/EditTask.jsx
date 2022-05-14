import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./TaskForm.css"


const EditTask = ({ updateTask, taskObj, modal}) => {

  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskState, setTaskState] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleChange = (e) => {
        
    const {name, value} = e.target

    if(name === "taskTitle"){
      setTaskTitle(value)
    }else{
      setTaskDescription(value)
      setTaskState(value)
    }

}

const handleUpdate = (e) => {
    e.preventDefault()
    let taskObj = {}
    taskObj["title"] = taskTitle
    taskObj["description"] = taskDescription
    taskObj["state"] = taskState
    updateTask()
    handleClose();
}
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          +
      </Button>
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Title"
                name="taskTitle"
                value={taskTitle}
                onChange = {handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Task Title"
                row={3}
                value={taskDescription}
                onChange = {handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Status</Form.Label>
              <select id="state" name="state" value={taskState} onChange={handleChange}>
                <option value="ToDo">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {console.log(taskTitle, taskDescription, taskState )}
    </>
  );
}

export default EditTask;

