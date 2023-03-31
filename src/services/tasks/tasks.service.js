const TASKS_KEY = process.env.REACT_APP_TASKS_KEY;

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
}

export function addTask(task) {
  const tasks = getTasks();
  localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, task]));
  return task;
}
