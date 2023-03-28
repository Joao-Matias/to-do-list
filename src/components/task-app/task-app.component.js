import { useEffect, useState } from 'react';
import TaskForm from '../task-form';
import TaskList from '../task-list';
import getCompletionOptions from '../../services/get-completion-options';

const TaskApp = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredOption, setFilteredOptions] = useState('All Tasks');

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      setTaskList(tasks);
    }
  }, []);

  useEffect(() => {
    if (taskList.length === 0) {
    } else {
      localStorage.setItem('tasks', JSON.stringify(taskList));
    }
  }, [taskList]);

  const options = getCompletionOptions().map((option) => {
    const { value, label } = option;
    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });

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
    localStorage.clear();
  };

  const deleteAllTaskPlusStorage = () => {
    const completedTasks = taskList.filter((task) => !task.completed);
    setTaskList(completedTasks);
  };

  const selectCompletionStatus = (event) => {
    setFilteredOptions(event.target.value);
  };

  return (
    <>
      <button onClick={completeAllTasks}>Complete All</button>
      <button onClick={openForm}>Add Task</button>
      <button onClick={deleteAllTasks}>Delete All Tasks</button>
      <button onClick={deleteAllTaskPlusStorage}>Clear Complete</button>
      <select onChange={selectCompletionStatus}>{options}</select>
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
        filteredOption={filteredOption}
      />
    </>
  );
};

export default TaskApp;
