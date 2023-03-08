import { useState } from "react";
import TaskForm from "../task-form";
import NewTaskItem from "../new-task-item";

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
      <NewTaskItem allTasks={taskList} />
    </>
  );
};

export default TaskApp;
