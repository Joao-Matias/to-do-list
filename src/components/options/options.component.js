import getCompletionOptions from '../../services/get-completion-options';

const Options = () => {
  const option = getCompletionOptions().map((option) => {
    const { value, label } = option;
    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });

  return option;
};

export default Options;
