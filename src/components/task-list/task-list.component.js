import { useState } from "react";
import styles from "./task-list.module.css";

const TaskList = (props) => {
  const [completed, setCompleted] = useState([]);
  const tasks = props.tasks;

  const toggleCompletion = (e) => {
    setCompleted({ ...completed });
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li className={styles.task} key={index}>
            <h4>Task Name:</h4>
            <h5>{task.name}</h5>
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

export default TaskList;
