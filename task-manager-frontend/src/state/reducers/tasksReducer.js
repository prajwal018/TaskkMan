// src/reducers/tasksReducer.js
const initialState = [];

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task._id !== action.payload);
    default:
      return state;
  }
};

export default tasksReducer;
