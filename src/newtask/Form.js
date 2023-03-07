import { useRef, useState } from "react";

const Form = (props) => {
  const [toggleButton, setToggleButton] = useState(true);
  const buttonEl = useRef();

  const submitForm = (e) => {
    e.preventDefault();
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
        <input onBlur={validateLength} name="taskName" type="text" />
      </label>
      <label>
        Due Date:
        <input name="dueDate" type="date" />
      </label>
      <label>
        Priority:
        <select>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <button
        ref={buttonEl}
        disabled={toggleButton}
        onClick={props.closeFormHandler}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
