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
    const taskId = checkbox.target.parentElement.attributes.id;

    setTaskList((prevState) =>
      prevState.map((task) => {
        if (task.id !== taskId) {
          return task;
        } else {
          return {
            ...task,
            completed: !task.completed,
          };
        }
      })
    );
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

  const handleTaskCompleted = (event) => {
    const taskId = +event.target.parentElement.attributes.id.value;
    const selectedTask = taskList.find((task) => task.id === taskId);

    console.log(taskId);
    console.log(selectedTask);

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
      <TaskList
        tasks={taskList}
        taskCompletionToggle={taskCompletionToggle}
        handleTaskCompleted={handleTaskCompleted}
      />
    </>
  );
};

export default TaskApp;
