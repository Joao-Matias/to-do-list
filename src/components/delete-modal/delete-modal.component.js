import styles from './delete-modal.module.css';

const DeleteModal = (props) => {
  const { setShowModal, chooseDeleteTask, selectedTask } = props;

  const taskName =
    selectedTask.target.parentElement.parentElement.attributes.name.value;
  const taskId = selectedTask.target.parentElement.parentElement.id;

  const deleteTask = (event) => {
    const taskToDeleteId = +event.target.id;
    chooseDeleteTask(taskToDeleteId);
    setShowModal(false);
  };

  const notDeleteTask = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.modal}>
      <header>
        <strong>Your about to delete task {taskName}.</strong> Are you sure?
      </header>
      <button id={taskId} onClick={deleteTask}>
        Yes
      </button>
      <button onClick={notDeleteTask}>No</button>
    </div>
  );
};

export default DeleteModal;
