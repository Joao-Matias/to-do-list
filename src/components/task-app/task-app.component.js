import { useState } from "react";
import TaskForm from "../task-form";
import TaskList from "../task-list";

const TaskApp = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const openForm = () => {
    setFormVisibility(true);
  };

  const closeForm = () => {
    setFormVisibility(false);
  };

  const addNewTask = (task) => {
    setTaskList([...taskList, task]);
  };

  return (
    <>
      <button onClick={openForm}>Add Task</button>
      {formVisibility && (
        <TaskForm addNewTask={addNewTask} closeFormHandler={closeForm} />
      )}
      <TaskList tasks={taskList} />
    </>
  );
};

export default TaskApp;
