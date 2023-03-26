import styles from './delete-modal.module.css';

const DeleteModal = (props) => {
  const { setShowDeleteModal, chooseDeleteTask, selectedTask } = props;

  const deleteTask = () => {
    chooseDeleteTask(selectedTask.id);
    setShowDeleteModal(false);
  };

  const notDeleteTask = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.modal}>
      <header>
        <strong className={styles.modalHead}>
          Your about to delete task {selectedTask.name}
        </strong>
      </header>
      <h4>Are you sure?</h4>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={deleteTask}>
          Yes
        </button>
        <button className={styles.button} onClick={notDeleteTask}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
