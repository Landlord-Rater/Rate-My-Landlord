import React from 'react';

export default function FormInput({ name, label, placeholder, type, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        type={type}
        className="bg-white rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-gray-200 p-1 text-black peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold text-white transition self-start"
      >
        {label}
      </label>
    </div>
  );
}
