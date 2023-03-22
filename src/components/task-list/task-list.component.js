import styles from './task-list.module.css';
import { ImBin } from 'react-icons/im';
import DeleteModal from '../delete-modal';
import { useState } from 'react';

const TASKS_PER_PAGE = 10;

const TaskList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { tasks, setTasks, handleTaskCompleted, currentPage, setCurrentPage } =
    props;

  const tasksWithIndex = tasks.map((task, i) => ({
    ...task,
    pageIndex: i + 1,
  }));

  const pages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const clickCheckbox = (event) => {
    const taskId = +event.target.id;
    handleTaskCompleted(taskId);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const chooseDeleteTask = (taskId) => {
    // setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <>
        {Array(pages)
          .fill(null)
          .map((_, i) => (
            <span
              style={{ cursor: 'pointer' }}
              key={i}
              className={i === currentPage ? 'active' : ''}
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
                <h4 className={styles.smallMarginRight}>Task Name:</h4>
                <h5 className={styles.marginRight}>{task.name}</h5>
                <h4 className={styles.smallMarginRight}>Due Date:</h4>
                <h5 className={styles.marginRight}>{task.dueDate}</h5>
                <h4 className={styles.smallMarginRight}>Priority:</h4>
                <h5 className={styles.marginRight}>{task.priority}</h5>
                <input
                  id={task.id}
                  role='button'
                  checked={task.completed}
                  hover-message={
                    task.completed ? 'Mark as Incomplete' : 'Mark as Complete'
                  }
                  className={styles.checkbox}
                  type='checkbox'
                  onChange={clickCheckbox}
                  style={{ cursor: 'pointer' }}
                ></input>
                <ImBin style={{ cursor: 'pointer' }} onClick={openModal} />
                {showModal && (
                  <DeleteModal
                    taskId={task.id}
                    chooseDeleteTask={chooseDeleteTask}
                    setShowModal={setShowModal}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default TaskList;
