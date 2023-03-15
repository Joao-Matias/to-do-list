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
    setTaskList((prevState) => [...prevState, task]);
  };

  const taskCompletionToggle = (checkbox) => {
    const taskName = checkbox.target.parentElement.attributes.value.value;

    setTaskList(
      taskList.map((task) => {
        if (task.name !== taskName) {
          return task;
        } else {
          return { ...task, completed: !task.completed };
        }
      })
    );
  };

  return (
    <>
      <button onClick={openForm}>Add Task</button>
      {formVisibility && (
        <TaskForm addNewTask={addNewTask} closeFormHandler={closeForm} />
      )}
      <TaskList tasks={taskList} taskCompletionToggle={taskCompletionToggle} />
    </>
  );
};

export default TaskApp;
