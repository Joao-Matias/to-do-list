import styles from "./NewTaskList.module.css";

const NewTaskList = (props) => {
  return (
    <ul>
      {props.allTasks.map((task, index) => {
        return (
          <li className={styles.task} key={index}>
            <h4>Task Name:</h4>
            <h5>{task.taskName}</h5>ç<h4>Due Date:</h4>
            <h5>{task.dueDate}</h5>
            <h4>Priority:</h4>
            <h5>{task.priority}</h5>
          </li>
        );
      })}
    </ul>
  );
};

export default NewTaskList;
