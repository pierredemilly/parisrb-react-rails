import React from "react";

export default function TextInput(props) {
  const { name, label, defaultValue, errors, disabled } = props;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <br />
      <input type="text" name={name} id={name} defaultValue={defaultValue} className={errors ? "border-red-800" : ""} disabled={disabled} />
      {errors && (
        <div className="text-red-900 text-sm italic">{errors.join(" ")}</div>
      )}
    </div>
  );
}
