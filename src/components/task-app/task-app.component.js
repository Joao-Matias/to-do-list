import { useEffect, useState } from 'react'
import TaskForm from '../task-form'
import TaskList from '../task-list'
import {
  getTasks,
  addTask,
  deleteAllTasksLocal,
  editTask,
  markAllTaskAsCompleted,
  deleteCompleted,
} from '../../services/tasks'
import Options from '../options'
import getSortingOptions from '../../services/get-sorting-options'

const TaskApp = () => {
  const [formVisibility, setFormVisibility] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredOption, setFilteredOptions] = useState('All Tasks')
  const [sortedOptions, setSortedOptions] = useState('Due Date')

  useEffect(() => {
    const tasks = getTasks()
    if (tasks) {
      setTaskList(tasks)
    }
  }, [])

  const sortingOptions = getSortingOptions().map((option) => {
    const { value, label } = option
    return (
      <option key={value} value={value}>
        {label}
      </option>
    )
  })

  const openForm = () => {
    setFormVisibility(true)
  }

  const closeForm = () => {
    setFormVisibility(false)
  }

  const addNewTask = (task) => {
    setTaskList((prevState) => {
      const addedTask = addTask(task)
      return [...prevState, addedTask]
    })
  }

  const completeAllTasks = () => {
    const request = markAllTaskAsCompleted()

    if (request) {
      const uncompleted = taskList.some((task) => !task.completed)
      const completedTasks = taskList.map((task) => {
        return {
          ...task,
          completed: uncompleted,
        }
      })
      setTaskList(completedTasks)
    }
  }

  const handleTaskCompleted = (task) => {
    const updatedTask = { ...task, completed: !task.completed }
    const changedTask = editTask(updatedTask)

    if (changedTask) {
      const changedTask = taskList.map((task) => {
        if (task.id === updatedTask.id) {
          return { ...task, ...updatedTask }
        } else {
          return task
        }
      })

      setTaskList(changedTask)
    }
  }

  const deleteAllTasks = () => {
    const deleteAll = deleteAllTasksLocal()
    if (deleteAll) {
      setTaskList([])
    }
  }

  const deleteCompletedTask = () => {
    const request = deleteCompleted()
    if (request) {
      const undeletedTasks = taskList.filter((task) => !task.completed)
      setTaskList(undeletedTasks)
    }
  }

  const selectCompletionStatus = (event) => {
    setFilteredOptions(event.target.value)
  }

  const selectSortingStatus = (event) => {
    setSortedOptions(event.target.value)
  }

  return (
    <>
      <button onClick={completeAllTasks}>Complete All</button>
      <button onClick={openForm}>Add Task</button>
      <button onClick={deleteAllTasks}>Delete All Tasks</button>
      <button onClick={deleteCompletedTask}>Clear Complete</button>
      <select onChange={selectCompletionStatus}>
        <Options />
      </select>
      <select onChange={selectSortingStatus}>{sortingOptions}</select>
      {formVisibility && <TaskForm role="form" addNewTask={addNewTask} closeFormHandler={closeForm} />}
      <TaskList
        role="list"
        tasks={taskList}
        setTasks={setTaskList}
        handleTaskCompleted={handleTaskCompleted}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredOption={filteredOption}
        sortedOptions={sortedOptions}
      />
    </>
  )
}

export default TaskApp
