import React from 'react';

export default function FormSubmit({ value, onClick }) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-secondary text-primary hover:bg-opacity-90 hover:text-dark-purple transition font-semibold text-lg cursor-pointer p-1"
      value={value}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
