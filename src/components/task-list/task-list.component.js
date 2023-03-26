import styles from './task-list.module.css';
import { ImBin } from 'react-icons/im';
import DeleteModal from '../delete-modal';
import { useState } from 'react';

const TASKS_PER_PAGE = 10;

const TaskList = (props) => {
  const [selectedTask, setSelectTask] = useState();
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

  const openModal = (event) => {
    setShowModal(true);
    setSelectTask(event);
  };

  const chooseDeleteTask = (taskId) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <>
        {Array(pages)
          .fill(null)
          .map((_, i) => (
            <button
              key={i}
              className={i === currentPage ? 'active' : ''}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
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
                id={task.id}
                name={task.name}
              >
                <h4 className={styles.smallMarginRight}>Task Name:</h4>
                <h5 className={styles.marginRight}>{task.name}</h5>
                <h4 className={styles.smallMarginRight}>Due Date:</h4>
                <h5 className={styles.marginRight}>{task.dueDate}</h5>
                <h4 className={styles.smallMarginRight}>Priority:</h4>
                <h5 className={styles.marginRight}>{task.priority}</h5>
                <input
                  id={task.id}
                  checked={task.completed}
                  hover-message={
                    task.completed ? 'Mark as Incomplete' : 'Mark as Complete'
                  }
                  className={styles.checkbox}
                  type='checkbox'
                  onChange={clickCheckbox}
                  style={{ cursor: 'pointer' }}
                ></input>
                <div
                  onClick={openModal}
                  hover-message={'Delete task'}
                  className={styles.bin}
                  style={{ cursor: 'pointer' }}
                >
                  <ImBin className={styles} />
                </div>
                {showModal && (
                  <DeleteModal
                    selectedTask={selectedTask}
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
