// src/reducers/index.js
import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  // ... other reducers if you have
});

export default rootReducer;
