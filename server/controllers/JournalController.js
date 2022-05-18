const db = require('../db/db.js');

exports.getAllEntries = (req, res) => {
  db.query('SELECT * FROM journal_entries WHERE user_id= $1 ORDER BY date_created DESC', [1])
    .then(result => res.json(result.rows))
    .catch(err => console.error(err.stack));
};

exports.saveEntry = (req, res) => {

  const { title, description, tags } = req.body;

  db.query('INSERT INTO journal_entries(user_id, title, description, tags) VALUES($1, $2, $3, $4) RETURNING *', [1, title, description, tags])
    .then(result => res.json(result.rows[0]))
    .catch(err => console.error(err.stack));

};

exports.updateEntry = (req, res) => {

  const { title, description, tags } = req.body;

  db.query('UPDATE journal_entries SET title = $1, description = $2, tags=$3 WHERE user_id = $4 AND id = $5 RETURNING *', [title, description, tags, 1, req.params.id])
    .then(result => res.json(result.rows[0]))
    .catch(err => console.error(err.stack));

};

exports.deleteEntry = (req, res) => {

  console.log(req.params.id);

  db.query('DELETE FROM journal_entries WHERE id = $1', [req.params.id])
    .then(result => res.status(200).json({ journal_entry: 'deleted' }))
    .catch(err => console.error(err.stack));

};