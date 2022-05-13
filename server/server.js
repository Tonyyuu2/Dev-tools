const db = require("./src/db/db");
const journalEntruyRoute = require("./src/routes/journalEntryRoute");
const todoListRoute = require("./src/routes/todoListRoute");

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//middleware
app.use(cors());
app.use(express.json());



