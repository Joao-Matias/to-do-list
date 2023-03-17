import styles from "./task-list.module.css";

const TaskList = (props) => {
  const { tasks, handleTaskCompleted } = props;

  const clickCheckbox = (event) => {
    const taskId = +event.target.parentElement.attributes.id.value;
    handleTaskCompleted(taskId);
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li
            className={task.completed ? styles.completedTask : styles.task}
            key={index}
            value={task.name}
            id={task.id}
          >
            <h4>Task Name:</h4>
            <h5>{task.name}</h5>
            <h4>Due Date:</h4>
            <h5>{task.dueDate}</h5>
            <h4>Priority:</h4>
            <h5>{task.priority}</h5>
            <input
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
