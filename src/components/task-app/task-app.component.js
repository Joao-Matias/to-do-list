import { useEffect, useState } from 'react';
import TaskForm from '../task-form';
import TaskList from '../task-list';
// import getCompletionOptions from '../../services/get-completion-options';
import {
  getTasks,
  addTask,
  deleteAllTasksLocal,
  checkBoxClick,
  completeTasks,
  deleteCompletedTasks,
} from '../../services/tasks';
import Options from '../options';

const TaskApp = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredOption, setFilteredOptions] = useState('All Tasks');

  useEffect(() => {
    const tasks = getTasks();
    if (tasks) {
      setTaskList(tasks);
    }
  }, []);

  const openForm = () => {
    setFormVisibility(true);
  };

  const closeForm = () => {
    setFormVisibility(false);
  };

  const addNewTask = (task) => {
    setTaskList((prevState) => {
      const addedTask = addTask(task);
      return [...prevState, addedTask];
    });
  };

  const completeAllTasks = () => {
    const completedTasks = completeTasks();
    setTaskList(completedTasks);
  };

  const handleTaskCompleted = (taskId) => {
    const changedTask = checkBoxClick(taskId);
    setTaskList(changedTask);
  };

  const deleteAllTasks = () => {
    setTaskList([]);
    deleteAllTasksLocal();
  };

  const deleteAllTaskPlusStorage = () => {
    const undeletedTasks = deleteCompletedTasks();
    setTaskList(undeletedTasks);
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
      <select onChange={selectCompletionStatus}>
        <Options />
      </select>
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
