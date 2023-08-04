// EditTaskModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditTaskModal({ task, show, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleStatusChange = () => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      status: prevTask.status === 'pending' ? 'completed' : 'pending',
    }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='pt-'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='pt-4'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='pt-4'>
            <Form.Check
              type="switch"
              id="statusSwitch"
              label={`Status: ${editedTask.status}`}
              onChange={handleStatusChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
