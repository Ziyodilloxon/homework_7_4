import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddTaskModal = ({ show, handleClose, handleSubmit }) => {
  const [taskName, setTaskName] = useState("");

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(taskName);
    setTaskName("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleInputChange}
            required
          />
          <Button variant="primary" type="submit" className="mt-3">
            Add Task
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
