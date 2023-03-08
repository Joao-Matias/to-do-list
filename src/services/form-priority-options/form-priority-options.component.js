const FormPriorityOptions = (props) => {
  const { updateTask } = props;
  return (
    <select name="priority" onChange={updateTask}>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  );
};

export default FormPriorityOptions;
