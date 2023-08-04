// src/store.js

import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk"
import rootReducer from './reducers'; // Combine your reducers

const store = createStore(rootReducer,{},applyMiddleware(thunk));

export default store;
