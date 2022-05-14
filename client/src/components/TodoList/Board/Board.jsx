import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { taskTitleArray, boardList } from "../Data";
import TaskForm from "../Form/TaskForm";
import styles from "./Board.module.css";
import React, { useState, useEffect } from "react";
import TaskHelper from "../Card/TaskHelper";

const Board = () => {

  const [taskList, setTaskList] = useState(taskTitleArray);
  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   let arr = localStorage.getItem("taskList")
   
  //   if(arr){
  //       let obj = JSON.parse(arr)
  //       setTaskList(obj)
  //   }
  // }, [])



  const saveTask = (taskObj) => {
    console.log(taskObj)
    let tempList = taskList;
    tempList.push(taskObj);
    //Save to database as well
    // localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  return (
  <>
  <div className="d-flex justify-content-center">
   

    {boardList.map((board) => {
        return (
          <Card
            className={styles.card}
            key={board.key}
            style={{ width: "18rem" }}
          >
            <Card.Header>
              {board.title}
              <TaskForm board={board} saveTask={saveTask} setTaskList={setTaskList}  />
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem><TaskHelper taskList={taskList} setTaskList={setTaskList}></TaskHelper></ListGroupItem>
            </ListGroup>
          </Card>
        );
      })}



  </div> 
  </>
  );
};

export default Board;


