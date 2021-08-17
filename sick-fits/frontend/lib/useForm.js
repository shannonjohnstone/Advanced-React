import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    const { type, value, files, name } = e.target;

    let valueToSet = value;

    if (type === 'number') {
      valueToSet = parseInt(value);
    }

    if (type === 'file') {
      [valueToSet] = files;
    }

    setInputs({
      ...inputs,
      [name]: valueToSet,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // const blankValues_BAK = Object.fromEntries(
    //   Object.entries(inputs).map(([key]) => [key, ''])
    // );

    const blankValues = Object.keys(inputs).reduce(
      (arr, key) => ({ ...arr, [key]: '' }),
      {}
    );

    setInputs(blankValues);
  }

  const values = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [values]);

  return { handleChange, resetForm, clearForm, inputs };
}
