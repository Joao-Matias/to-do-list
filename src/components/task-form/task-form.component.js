import { useState } from 'react'
import getPriorityOptions from '../../services/get-priority-options'

const TaskForm = (props) => {
  const { addNewTask, closeFormHandler } = props
  const [task, setTask] = useState({
    name: '',
    dueDate: '',
    priority: 'Low',
  })

  const options = getPriorityOptions().map((option) => {
    const { value, label } = option
    return (
      <option key={value} value={value}>
        {label}
      </option>
    )
  })

  const submitForm = (event) => {
    event.preventDefault()
    addNewTask({
      ...task,
      completed: false,
      id: Date.now(),
    })
    closeFormHandler()
  }

  const updateTask = (event) => {
    const {
      target: { name, value },
    } = event

    let prioNumber = 1

    if (name === 'priority') {
      if (value === 'Low') {
        prioNumber = 1
      }
      if (value === 'Medium') {
        prioNumber = 2
      }
      if (value === 'High') {
        prioNumber = 3
      }
    }

    setTask({ ...task, [name]: value, prioNumber: prioNumber })
  }

  return (
    <form onSubmit={submitForm}>
      <label>
        Task Name:
        <input onChange={updateTask} name="name" type="text" maxLength={50} />
      </label>
      <label>
        Due Date:
        <input onChange={updateTask} name="dueDate" type="date" />
      </label>
      <label>
        Priority:
        <select name="priority" onChange={updateTask}>
          {options}
        </select>
      </label>

      <button disabled={task.name.length === 0}>Submit</button>
    </form>
  )
}

export default TaskForm
