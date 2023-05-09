const TASKS_KEY = process.env.REACT_APP_TASKS_KEY

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]')
}

export function addTask(task) {
  const tasks = getTasks()
  localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, task]))
  return task
}

export function deleteAllTasksLocal() {
  localStorage.setItem(TASKS_KEY, JSON.stringify([]))
  return true
}

export function deleteTask(taskId) {
  const tasks = getTasks()
  const filterTasks = tasks.filter((task) => task.id !== taskId)
  localStorage.setItem(TASKS_KEY, JSON.stringify(filterTasks))
  return true
}
console.log('ola')
export function editTask(updatedTask) {
  const tasks = getTasks()

  const changedTask = tasks.map((task) => {
    if (task.id === updatedTask.id) {
      return { ...task, ...updatedTask }
    } else {
      return task
    }
  })
  localStorage.setItem(TASKS_KEY, JSON.stringify(changedTask))
  return true
}

export function markAllTaskAsCompleted() {
  const tasks = getTasks()
  const uncompleted = tasks.some((task) => !task.completed)
  const completedTasks = tasks.map((task) => {
    return {
      ...task,
      completed: uncompleted,
    }
  })

  localStorage.setItem(TASKS_KEY, JSON.stringify(completedTasks))
  return true
}

export function deleteCompleted() {
  const tasks = getTasks()
  const completedTasks = tasks.filter((task) => !task.completed)
  localStorage.setItem(TASKS_KEY, JSON.stringify(completedTasks))
  return true
}
