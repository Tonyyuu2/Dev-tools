require("dotenv").config();

<<<<<<< HEAD

const PORT = process.env.PORT || 9001;
=======
>>>>>>> 0f4b6328cdf71441fe10a1deb8b3adc8811e39c1
const express = require("express");
const app = express();
const morgan = require("morgan");


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/auth', require('./routes/usersRoutes'));
app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/tasks', require('./routes/tasksRoutes'));
app.use('/api/datalab', require('./routes/datalabRoutes'));

module.exports = app;