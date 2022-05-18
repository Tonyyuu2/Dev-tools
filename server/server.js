require("dotenv").config();


const PORT = process.env.PORT || 9001;
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
