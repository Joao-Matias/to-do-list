import { useRef, useState } from "react";

const Form = (props) => {
  const [toggleButton, setToggleButton] = useState(true);
  const [data, setData] = useState({
    taskName: "",
    dueDate: "",
    priority: "low",
  });

  const buttonEl = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    props.getNewTaskHandler(data);
    props.closeFormHandler();
  };

  const getData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateLength = (e) => {
    const textLength = e.target.value.length;
    if (textLength < 1) {
      setToggleButton(true);
      alert("Your task needs to have a name.");
    } else {
      setToggleButton(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <label>
        Task Name:
        <input
          onChange={getData}
          onBlur={validateLength}
          name="taskName"
          type="text"
          maxLength={50}
        />
      </label>
      <label>
        Due Date:
        <input onChange={getData} name="dueDate" type="date" />
      </label>
      <label>
        Priority:
        <select name="priority" onChange={getData}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <button ref={buttonEl} disabled={toggleButton}>
        Submit
      </button>
    </form>
  );
};

export default Form;
