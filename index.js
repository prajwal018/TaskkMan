// index.js
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
require('./db'); // Connect to the database
const taskRouter = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(taskRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("task-manager-frontend/build"));
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
