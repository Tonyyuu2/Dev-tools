require("dotenv").config();
const verifyToken = require('./middlewears/verifyToken');
const express = require("express");
const app = express();
const morgan = require("morgan");


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/auth', require('./routes/usersRoutes'));

app.use(verifyToken);
app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/tasks', require('./routes/tasksRoutes'));
app.use('/api/datalab', require('./routes/datalabRoutes'));

module.exports = app;