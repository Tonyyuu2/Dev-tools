const db = require('../db/db.js');

exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = $1', [1])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e.stack));
};

exports.saveTask = (req, res) => {
  db.query('INSERT INTO tasks(user_id, description) VALUES ($1, $2) RETURNING *', [1, req.query.desc])
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack));
};

exports.updateTask = (req, res) => {
  db.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [req.query.status, req.query.id])
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack));
};

exports.deleteTask = (req, res) => {
  db.query('DELETE FROM tasks WHERE id = $1', [req.params.id])
    .then(result => res.status(200).json({ deleted: 'true' }))
    .catch(e => console.error(e.stack));
};