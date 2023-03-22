import styles from './delete-modal.module.css';

const DeleteModal = (props) => {
  const { setShowModal, chooseDeleteTask, taskId } = props;

  console.log(taskId);
  const deleteTask = (event) => {
    const taskToDeleteId = +event.target.parentElement.id;
    console.log(event);
    chooseDeleteTask(taskToDeleteId);
    setShowModal(false);
  };

  const notDeleteTask = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.modal}>
      <header>Are you sure you want to delete this task?</header>
      <button id={taskId} onClick={deleteTask} style={{ cursor: 'pointer' }}>
        Yes
      </button>
      <button onClick={notDeleteTask} style={{ cursor: 'pointer' }}>
        No
      </button>
    </div>
  );
};

export default DeleteModal;
