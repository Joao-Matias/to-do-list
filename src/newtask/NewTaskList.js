import { useState } from "react";
import styles from "./NewTaskList.module.css";

const NewTaskList = (props) => {
  const [completed, setCompleted] = useState([]);

  const toggleCompletion = (e) => {
    console.log(e);
    setCompleted({ ...completed });
  };

  return (
    <ul>
      {props.allTasks.map((task, index) => {
        return (
          <li className={(styles.task, "${}")} key={index}>
            <h4>Task Name:</h4>
            <h5>{task.taskName}</h5>
            <h4>Due Date:</h4>
            <h5>{task.dueDate}</h5>
            <h4>Priority:</h4>
            <h5>{task.priority}</h5>
            <input onClick={toggleCompletion} type="checkbox"></input>
          </li>
        );
      })}
    </ul>
  );
};

export default NewTaskList;
