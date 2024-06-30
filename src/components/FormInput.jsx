import React from "react";

function FormInput({ type, name, label, status }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder="Type here"
        className={`input input-bordered input-${status} w-full`}
      />
    </label>
  );
}

export default FormInput;
