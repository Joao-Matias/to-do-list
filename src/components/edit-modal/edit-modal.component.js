import styles from './edit-modal.module.css';
import getPriorityOptions from '../../services/get-priority-options';
import { useState } from 'react';

const EditModal = (props) => {
  const { setShowEditModal, chooseEditTask, selectedTask } = props;
  const [task, setTask] = useState({ name: '', priority: 'Low' });

  const options = getPriorityOptions().map((option) => {
    const { value, label } = option;
    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });

  const editTask = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    setTask({ ...task, [name]: value });
  };

  const submitEditForm = (event) => {
    event.preventDefault();
    chooseEditTask({
      ...task,
      completed: selectedTask.completed,
      id: selectedTask.id,
      pageIndex: selectedTask.pageIndex,
    });
    setShowEditModal(false);
  };

  const notEditTask = (event) => {
    event.preventDefault();
    setShowEditModal(false);
  };

  return (
    <form className={styles.modal} onSubmit={submitEditForm}>
      <header>
        <strong className={styles.modalHead}>
          You are editing {selectedTask.name}
        </strong>
        <label className={styles.smallMarginRight}>
          Task Name:
          <input
            placeholder='Name of the Task'
            name='name'
            type='text'
            maxLength={50}
            onChange={editTask}
            className={styles.marginRight}
          ></input>
        </label>
        <label className={styles.smallMarginRight}>
          Due Date:
          <input
            name='dueDate'
            type='date'
            onChange={editTask}
            className={styles.marginRight}
          ></input>
        </label>
        <label className={styles.smallMarginRight}>
          Priority:
          <select onChange={editTask} name='priority'>
            {options}
          </select>
        </label>
        <button disabled={task.name.length === 0}>Save</button>
        <button onClick={notEditTask}>Cancel</button>
      </header>
    </form>
  );
};

export default EditModal;
