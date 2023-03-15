import styles from "./task-list.module.css";

const TaskList = (props) => {
  const { tasks, taskCompletionToggle } = props;

  const completionToggle = (event) => {
    taskCompletionToggle(event);
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li
            className={styles.task}
            key={index}
            value={task.name}
            onChange={completionToggle}
          >
            <h4>Task Name:</h4>
            <h5>{task.name}</h5>
            <h4>Due Date:</h4>
            <h5>{task.dueDate}</h5>
            <h4>Priority:</h4>
            <h5>{task.priority}</h5>
            <input type="checkbox"></input>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
