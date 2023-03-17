import styles from "./task-list.module.css";

const TaskList = (props) => {
  const { tasks, handleTaskCompleted } = props;

  const clickCheckbox = (event) => {
    const taskId = +event.target.id;
    handleTaskCompleted(taskId);
    console.log(event.target.id);
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li
            className={task.completed ? styles.completedTask : styles.task}
            key={index}
          >
            <h4>Task Name:</h4>
            <h5>{task.name}</h5>
            <h4>Due Date:</h4>
            <h5>{task.dueDate}</h5>
            <h4>Priority:</h4>
            <h5>{task.priority}</h5>
            <input
              id={task.id}
              role="button"
              checked={task.completed}
              hover-message={
                task.completed ? "Mark as Incomplete" : "Mark as Complete"
              }
              className={styles.checkbox}
              type="checkbox"
              onChange={clickCheckbox}
            ></input>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
