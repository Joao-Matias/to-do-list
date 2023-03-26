import styles from './delete-modal.module.css';

const DeleteModal = (props) => {
  const { setShowModal, chooseDeleteTask, selectedTask } = props;

  const deleteTask = () => {
    chooseDeleteTask(selectedTask.id);
    setShowModal(false);
  };

  const notDeleteTask = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.modal}>
      <header>
        Your about to delete task <strong>{selectedTask.name}</strong>. Are you
        sure?
      </header>
      <button onClick={deleteTask}>Yes</button>
      <button onClick={notDeleteTask}>No</button>
    </div>
  );
};

export default DeleteModal;
