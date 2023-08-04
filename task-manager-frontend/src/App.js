import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { CheckCircle, PlusCircle } from 'react-bootstrap-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  
  const [tab, setTab] = useState('all'); // Initialize with 'all'



  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <div className='p-2 d-flex justify-content-between'><h3>Task Manager</h3>
        <Nav variant="pills" defaultActiveKey="all" onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="all">
              <CheckCircle size={20} /> All Tasks
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="add">
              <PlusCircle size={20} /> Add Task
            </Nav.Link>
          </Nav.Item>
        </Nav></div>
      <Container className="mt-4">
        {tab === 'all' && (
          <TaskList  />
        )}
        {tab === 'add' && (
          <AddTask />
        )}
        <ToastContainer position="bottom-right" /> {/* Add ToastContainer */}

      </Container>
    </>
  );
}

export default App;