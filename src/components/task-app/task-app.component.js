import { useState } from 'react';
import TaskForm from '../task-form';
import TaskList from '../task-list';

const TaskApp = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
    const uncompleted = taskList.some((task) => !task.completed);

    setTaskList((prevState) =>
      prevState.map((task) => {
        return {
          ...task,
          completed: uncompleted,
        };
      })
    );
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

  const deleteAllTasks = () => {
    setTaskList([]);
  };

  return (
    <>
      <button onClick={completeAllTasks}>Complete All</button>
      <button onClick={openForm}>Add Task</button>
      <button onClick={deleteAllTasks}>Delete All Tasks</button>
      {formVisibility && (
        <TaskForm
          role='form'
          addNewTask={addNewTask}
          closeFormHandler={closeForm}
        />
      )}
      <TaskList
        role='list'
        tasks={taskList}
        setTasks={setTaskList}
        handleTaskCompleted={handleTaskCompleted}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TaskApp;
