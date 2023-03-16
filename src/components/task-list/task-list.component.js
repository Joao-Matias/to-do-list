import styles from "./task-list.module.css";

const TaskList = (props) => {
  const { tasks, taskCompletionToggle } = props;

  const completionToggle = (event) => {
    taskCompletionToggle(event);
  };

  const hoverCheckbox = () => {
    <div>Ola</div>;
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li
            className={task.completed ? styles.completedTask : styles.task}
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
            <input
              hover-message={task.hoverMessage}
              className={styles.checkbox}
              onMouseEnter={hoverCheckbox}
              type="checkbox"
            ></input>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
