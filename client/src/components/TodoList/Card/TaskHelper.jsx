import TaskContainer from './TaskContainer'
import styles from './TaskHelper.module.css'

const TaskHelper = ({taskList, setTaskList}) => {

 // Thinking each board will ahve its own array 
  const deleteTask = (index) => {
   let tempList = taskList
   tempList.splice(index, 1)
   // Saving it to local storage
   localStorage.setItem("taskList", JSON.stringify(tempList)) 
   setTaskList(tempList)
   window.location.reload()
  }

  const updateTasks = (obj, index) => {
    let tempList = taskList
    tempList[index] = obj
    // Saving it to local storage
    localStorage.setItem("taskList", JSON.stringify(tempList)) 
    setTaskList(tempList)
    window.location.reload()
  }

  return (
    <div className = {styles.taskContainer}>
      <h1>{taskList[0].title}</h1>
     {taskList && taskList.map((obj, index) =>
       <TaskContainer key={index} index={index} taskObj = {obj} updateTasks={updateTasks} deleteTask={deleteTask} ></TaskContainer>
      )}
   </div>
  )
}

export default TaskHelper