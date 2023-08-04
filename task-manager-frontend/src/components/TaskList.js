// src/components/TaskList.js
import React, { useState, useEffect } from 'react'; // Import React
import { connect } from 'react-redux';
import axios from 'axios';
import { Accordion, Container, Button } from 'react-bootstrap';
import { updateTask, deleteTask } from '../state/actions/tasksActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TaskList() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const handleCompleteStatus = async (taskId) => {
    try {
      await axios.patch(`/tasks/${taskId}`, { status: 'completed' });
      toast.success('Task completed');
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const handlePendingStatus = async (taskId) => {
    try {
      await axios.patch(`/tasks/${taskId}`, { status: 'pending' });
      toast.warning('Task Pending');
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container className='col-8'>
      <h2 className='d-flex justify-content-center'>All Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id}>
          <Accordion className='pt-4'>
            <Accordion.Item eventKey={task._id}>
              <Accordion.Header>
                <p className={`m-0 ${task.status.toLowerCase() === "completed" ? 'text-decoration-line-through' : ''}`}>
                  {task.title.toUpperCase()}
                </p>
              </Accordion.Header>
              <Accordion.Body >
                <p>{task.description}</p>
                <div className='d-flex justify-content-end'>
                  <div>
                    {task.status.toLowerCase() === "pending" ? (
                      <Button variant="outline-success" onClick={() => handleCompleteStatus(task._id)}>
                        Mark as Complete
                      </Button>
                    ) : (<Button variant="outline-warning" onClick={() => handlePendingStatus(task._id)}>
                      Mark as Pending
                    </Button>
                    )}
                    <Button variant="outline-danger" className='ms-2' onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
      
    </Container>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: (task) => dispatch(updateTask(task)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
