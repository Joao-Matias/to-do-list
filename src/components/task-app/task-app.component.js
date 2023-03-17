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

  const completeAllTasks = () => {
    if (taskList.find((task) => !task.completed)) {
      setTaskList((prevState) =>
        prevState.map((task) => {
          return {
            ...task,
            completed: true,
          };
        })
      );
    } else {
      setTaskList((prevState) =>
        prevState.map((task) => {
          return {
            ...task,
            completed: false,
          };
        })
      );
    }
  };

  const handleTaskCompleted = (taskId) => {
    const selectedTask = taskList.find((task) => task.id === taskId);

    setTaskList((prevState) =>
      prevState.map((task) => {
        if (task.id === selectedTask.id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <>
      <button onClick={completeAllTasks}>Complete All</button>
      <button onClick={openForm}>Add Task</button>

      {formVisibility && (
        <TaskForm addNewTask={addNewTask} closeFormHandler={closeForm} />
      )}
      <TaskList tasks={taskList} handleTaskCompleted={handleTaskCompleted} />
    </>
  );
};

export default TaskApp;
