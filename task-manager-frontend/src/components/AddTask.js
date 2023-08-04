// src/components/AddTask.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import react-toastify components
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components
import { connect } from 'react-redux';
import { addTask } from '../state/actions/tasksActions';


function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', {
        title,
        description,
        status,
      });
      onAddTask(response.data);
      setTitle('');
      setDescription('');
      toast.info('Task added successfully'); // Display success toast
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Container className='col-8'>
      <h2 className='d-flex justify-content-center'>Add New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className='pt-4'>
          <Form.Label >TITLE</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description" className='pt-4'>
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="status" className='pt-4'>
          <Form.Label>STATUS</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="switch"
                id="statusSwitch"
                label="Completed"
                checked={status === 'completed'}
                onChange={() => setStatus(status === 'pending' ? 'completed' : 'pending')}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-4'>
          Add Task
        </Button>
      </Form>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onAddTask: (task) => dispatch(addTask(task)),
});

export default connect(null, mapDispatchToProps)(AddTask);