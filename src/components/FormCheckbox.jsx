import React from "react";

function FormCheckbox({ name }) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Completed</span>
        <input
          name={name}
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-success"
        />
      </label>
    </div>
  );
}

export default FormCheckbox;
