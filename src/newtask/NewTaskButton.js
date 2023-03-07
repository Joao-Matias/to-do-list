import { useState } from "react";
import Form from "./Form";

const NewTaskButton = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const openForm = () => {
    setToggleForm(true);
  };

  const closeForm = () => {
    setToggleForm(false);
  };

  return (
    <>
      <button onClick={openForm}>Add Task</button>
      {toggleForm && <Form closeFormHandler={closeForm} />}
    </>
  );
};

export default NewTaskButton;
