import { useRef, useState } from "react";
import getPriorityOptions from "../../services/get-priority-options";

const TaskForm = (props) => {
  const { addNewTask, closeFormHandler } = props;
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
    priority: "Low",
  });

  const buttonEl = useRef();

  const options = getPriorityOptions().map((option) => {
    const { value, label } = option;
    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });

  const submitForm = (event) => {
    event.preventDefault();
    addNewTask(task);
    closeFormHandler();
  };

  const updateTask = (event) => {
    const {
      target: { name, value },
    } = event;
    setTask({ ...task, [name]: value });
  };

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

      <button ref={buttonEl} disabled={task.name.length === 0}>
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
