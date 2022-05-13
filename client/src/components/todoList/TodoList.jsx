import React, {useEffect, useState} from 'react';
import CreateTask from './modal/CreateTask'
import styles from './TodoList.module.css'
import TodoListbody from './TodoListBody';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    

    const statuses = [{
        status: "open",
        icon: "⭕️",
        color: "#EB5A46"
    }, {
        status: "in progress",
        icon: "🔆️",
        color: "#00C2E0"
    }, {
        status: "in review",
        icon: "📝",
        color: "#C377E0"
    }, {
        status: "done",
        icon: "✅",
        color: "#3981DE"
    }];


    let taskTitleArray = [
        {   
            key:1,
            stat: "TODo" ,
            title: "Brush teeth",

        },
        {
            key:2,
            stat: "Doing",
            title: "Eat ramen",

        },
        {
            key:3,
            stat: "Done",
            title: "clean cat shit box",

        }
    ]
    
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)

    }



    return (
        <>
            <div className = {`text-center ${styles.header}`}>
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            
            
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>



    <div className={styles.colContainer}>
    {Object.keys(taskTitleArray[0]).map((stat)=> {
       return(
        <div key={stat} className={styles.colWrapper}>
           <h1>{taskTitleArray.stat}</h1>
           <div className={styles.col}>

               <TodoListbody taskList={taskList} setTaskList={setTaskList} ></TodoListbody>

           </div>
       </div>
       ) 

    })}

    </div>



         
        </>
    );
};

export default TodoList;

