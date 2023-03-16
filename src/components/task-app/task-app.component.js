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
          return {
            ...task,
            completed: !task.completed,
            hoverMessage: task.completed
              ? "Mark as Complete"
              : "Mark as Incomplete",
          };
        }
      })
    );
  };

  const completeAllTasks = () => {
    if (taskList.find((task) => !task.completed)) {
      setTaskList(
        taskList.map((task) => {
          return {
            ...task,
            completed: true,
            hoverMessage: "Mark as Incomplete",
          };
        })
      );
    } else {
      setTaskList(
        taskList.map((task) => {
          return {
            ...task,
            completed: false,
            hoverMessage: "Mark as Complete",
          };
        })
      );
    }
  };

  return (
    <>
      <button onClick={completeAllTasks}>Complete All</button>
      <button onClick={openForm}>Add Task</button>
      {formVisibility && (
        <TaskForm addNewTask={addNewTask} closeFormHandler={closeForm} />
      )}
      <TaskList tasks={taskList} taskCompletionToggle={taskCompletionToggle} />
    </>
  );
};

export default TaskApp;
