import React from "react";

function TodoInput({ handleSubmit, inputText }) {
  return (
    <div className="mb-2">
      <form onSubmit={handleSubmit}>
        <div className=" flex items-center gap-3">
          <input
            ref={inputText}
            placeholder="Add Task :"
            className="border-4  font-semibold radius-4 text-xl pl-4 pb-2 pt-2"
            type="text"
          />
        </div>
      </form>
    </div>
  );
}

export default TodoInput;
