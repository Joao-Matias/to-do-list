import { useRef, useState } from "react";
import PriorityOptions from "../../services/priority-options";

const TaskForm = (props) => {
  const { getNewTaskHandler, closeFormHandler } = props;
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
    priority: "low",
  });

  const buttonEl = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    getNewTaskHandler(task);
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
        <PriorityOptions updateTaskHandler={updateTask} />
      </label>

      <button ref={buttonEl} disabled={task.name.length === 0}>
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
