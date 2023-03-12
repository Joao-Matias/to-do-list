import { useState } from "react";
import TaskForm from "../task-form";
import TaskList from "../task-list";

const TaskApp = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const openForm = () => {
    setToggleForm(true);
  };

  const closeForm = () => {
    setToggleForm(false);
  };

  const getNewTask = (data) => {
    setTaskList([...taskList, data]);
  };

  return (
    <>
      <button onClick={openForm}>Add Task</button>
      {toggleForm && (
        <TaskForm getNewTaskHandler={getNewTask} closeFormHandler={closeForm} />
      )}
      <TaskList tasks={taskList} />
    </>
  );
};

export default TaskApp;
