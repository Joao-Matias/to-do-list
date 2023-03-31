const TASKS_KEY = 'tasks';

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
}

export function addTask(task) {
  const tasks = getTasks();
  localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, task]));
  return task;
}

export function deleteAllTasksLocal() {
  localStorage.clear();
}

export function deleteTask(taskId) {
  const tasks = getTasks();
  const filterTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(filterTasks));
  return filterTasks;
}

export function editTask(newTask) {
  const tasks = getTasks();
  const updatedTask = tasks.map((task) => {
    if (task.id !== newTask.id) {
      return task;
    } else {
      return newTask;
    }
  });
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTask));
  return updatedTask;
}

export function checkBoxClick(taskId) {
  const tasks = getTasks();
  const selectedTask = tasks.find((task) => task.id === taskId);

  const changedTask = tasks.map((task) => {
    if (task.id === selectedTask.id) {
      return { ...task, completed: !task.completed };
    } else {
      return task;
    }
  });

  localStorage.setItem(TASKS_KEY, JSON.stringify(changedTask));
  return changedTask;
}

export function completeTasks() {
  const tasks = getTasks();
  const uncompleted = tasks.some((task) => !task.completed);
  const completedTasks = tasks.map((task) => {
    return {
      ...task,
      completed: uncompleted,
    };
  });

  localStorage.setItem(TASKS_KEY, JSON.stringify(completedTasks));
  return completedTasks;
}

export function deleteCompletedTasks() {
  const tasks = getTasks();
  const completedTasks = tasks.filter((task) => !task.completed);
  localStorage.setItem(TASKS_KEY, JSON.stringify(completedTasks));
  return completedTasks;
}
