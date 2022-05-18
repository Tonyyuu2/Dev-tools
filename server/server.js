<<<<<<< HEAD
const db = require("./src/db/db");
const journalEntruyRoute = require("./src/routes/journalEntryRoute");
const todoListRoute = require("./src/routes/todoListRoute");
require('dotenv').config();


const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT;


//middleware
app.use(cors());
app.use(express.json());

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

=======
require("dotenv").config();


const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/tasks', require('./routes/tasksRoutes'));
app.use('/api/datalab', require('./routes/datalabRoutes'));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
>>>>>>> feature/merge
