import { useState } from "react";
import Form from "./Form";
import NewTaskList from "./NewTaskList";

const NewTask = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [newTask, setNewTask] = useState([]);

  const openForm = () => {
    setToggleForm(true);
  };

  const closeForm = () => {
    setToggleForm(false);
  };

  const getNewTask = (data) => {
    setNewTask([...newTask, data]);
  };

  return (
    <>
      <button onClick={openForm}>Add Task</button>
      {toggleForm && (
        <Form getNewTaskHandler={getNewTask} closeFormHandler={closeForm} />
      )}
      <NewTaskList allTasks={newTask} />
    </>
  );
};

export default NewTask;
