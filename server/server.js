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

