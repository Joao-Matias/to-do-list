const getCompletionOptions = () => {
  return [
    { value: 'All-Tasks', label: 'All Tasks' },
    { value: 'Incompleted', label: 'Incompleted Tasks' },
    { value: 'Completed', label: 'Completed Tasks' },
  ]
}

export default getCompletionOptions
