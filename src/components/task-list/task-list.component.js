import styles from "./task-list.module.css";

const TASKS_PER_PAGE = 10;

const TaskList = (props) => {
  const { tasks, handleTaskCompleted, currentPage, setCurrentPage } = props;

  const tasksWithIndex = tasks.map((task, i) => ({
    ...task,
    pageIndex: i + 1,
  }));

  const pages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const clickCheckbox = (event) => {
    const taskId = +event.target.id;
    handleTaskCompleted(taskId);
  };

  return (
    <>
      <>
        {Array(pages)
          .fill(null)
          .map((_, i) => (
            <span
              key={i}
              className={i === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </span>
          ))}
      </>
      <ul>
        {tasksWithIndex
          .slice(
            currentPage * TASKS_PER_PAGE,
            (currentPage + 1) * TASKS_PER_PAGE
          )
          .map((task) => {
            return (
              <li
                className={task.completed ? styles.completedTask : styles.task}
                key={task.id}
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
    </>
  );
};

export default TaskList;
