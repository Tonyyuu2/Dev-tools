const db = require('../db/db.js');

exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = $1', [req.userid])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e.stack));
};

exports.saveTask = (req, res) => {

  db.query('INSERT INTO tasks(user_id, description) VALUES ($1, $2) RETURNING *', [req.userid, req.body.desc])
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack));
};

exports.updateTask = (req, res) => {

  const { id, status } = req.body;

  db.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [status, id])
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack));
};

exports.deleteTask = (req, res) => {
  db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.userid])
    .then(result => res.status(200).json({ deleted: 'true' }))
    .catch(e => console.error(e.stack));
};