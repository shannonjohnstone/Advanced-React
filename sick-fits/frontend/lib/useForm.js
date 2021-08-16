import { useState } from 'react';

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

  return { handleChange, resetForm, clearForm, inputs };
}
