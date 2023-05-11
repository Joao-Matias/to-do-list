import styles from './task-list.module.css'
import { ImBin, ImPencil } from 'react-icons/im'
import DeleteModal from '../delete-modal'
import { useState } from 'react'
import EditModal from '../edit-modal'
import { deleteTask, editTask } from '../../services/tasks'

const TASKS_PER_PAGE = 10

const TaskList = (props) => {
  const [selectedTask, setSelectTask] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const { tasks, setTasks, handleTaskCompleted, currentPage, setCurrentPage, filteredOption, sortedOptions } = props

  const filter = (option) => {
    switch (option) {
      case 'All-Tasks':
        return (t) => true
      case 'Incompleted':
        return (t) => !t.completed
      case 'Completed':
        return (t) => t.completed
      default:
        return (t) => true
    }
  }

  const sortedFilter = (option) => {
    switch (option) {
      case 'Due-Date':
        return (a, b) => {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        }
      case 'Priority':
        return (b, a) => {
          return a.prioNumber - b.prioNumber
        }
      default:
        return
    }
  }

  const tasksWithIndex = tasks
    .filter(filter(filteredOption))
    .sort(sortedFilter(sortedOptions))
    .map((task, i) => ({
      ...task,
      pageIndex: i + 1,
    }))

  const pages = Math.ceil(tasks.length / TASKS_PER_PAGE)

  const clickCheckbox = (task) => {
    handleTaskCompleted(task)
  }

  const openDeleteModal = (task) => {
    setShowDeleteModal(true)
    setSelectTask(task)
  }

  const chooseDeleteTask = (taskId) => {
    const completedStatus = deleteTask(taskId)
    if (completedStatus) {
      const filterTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(filterTasks)
    }
  }

  const openEditModal = (task) => {
    setShowEditModal(true)
    setSelectTask(task)
  }

  const chooseEditTask = (task) => {
    const updatedTasks = editTask(task)

    if (updatedTasks) {
      const changedTask = tasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, ...task }
        } else {
          return t
        }
      })
      setTasks(changedTask)
    }
  }

  return (
    <>
      <>
        {Array(pages)
          .fill(null)
          .map((_, i) => (
            <button key={i} className={i === currentPage ? 'active' : ''} onClick={() => setCurrentPage(i)}>
              {i + 1}
            </button>
          ))}
      </>
      <ul>
        {tasksWithIndex.slice(currentPage * TASKS_PER_PAGE, (currentPage + 1) * TASKS_PER_PAGE).map((task) => {
          return (
            <li
              className={task.completed ? styles.completedTask : styles.task}
              key={task.id}
              id={task.id}
              name={task.name}
            >
              <h4 className={styles.smallMarginRight}>Task Name:</h4>
              <h5 className={styles.marginRight}>{task.name}</h5>
              <h4 className={styles.smallMarginRight}>Due Date:</h4>
              <h5 className={styles.marginRight}>{task.dueDate}</h5>
              <h4 className={styles.smallMarginRight}>Priority:</h4>
              <h5 className={styles.marginRight}>{task.priority}</h5>
              <div className={styles.icons}>
                <input
                  id={task.id}
                  checked={task.completed}
                  hover-message={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={() => {
                    clickCheckbox(task)
                  }}
                ></input>
                <div onClick={() => openDeleteModal(task)} hover-message={'Delete task'} className={styles.bin}>
                  <ImBin />
                </div>
                {showDeleteModal && (
                  <DeleteModal
                    selectedTask={selectedTask}
                    chooseDeleteTask={chooseDeleteTask}
                    setShowDeleteModal={setShowDeleteModal}
                  />
                )}
                <div onClick={() => openEditModal(task)} hover-message={'Edit task'} className={styles.pencil}>
                  <ImPencil />
                </div>
                <div>
                  {showEditModal && (
                    <EditModal
                      selectedTask={selectedTask}
                      chooseEditTask={chooseEditTask}
                      setShowEditModal={setShowEditModal}
                    />
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TaskList
