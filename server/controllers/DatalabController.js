const db = require('../db/db.js');

exports.saveBackcareModel = (req, res) => {

  db.query('UPDATE users SET backcare_model = $1 WHERE id = $2', [req.body.model, 1])
    .then(result => res.status(200).json({ model_data: 'saved' }))
    .catch(e => console.error(e.stack));

};

exports.getBackcareModel = (req, res) => {

  db.query('SELECT backcare_model from users where id = $1', [1])
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack));

};

exports.updateBackcareModel = (req, res) => {

  db.query('UPDATE users SET backcare_model = NULL where id = $1', [1])
    .then(result => res.status(200).json({ model_data: 'deleted' }))
    .catch(e => console.error(e.stack));

};

exports.saveBackcareData = (req, res) => {
  db.query('INSERT INTO health_data(user_id, good_posture, bad_posture) VALUES($1, $2, $3)',
    [1, req.query.good, req.query.bad])
    .then(result => res.status(200).json({ data_added: true }))
    .catch(e => console.error(e.stack));
};

exports.getBackcareData = (req, res) => {
  db.query(`SELECT TO_CHAR (date_created, 'Month') as month, sum(good_posture) as good,sum(bad_posture) as bad FROM health_data WHERE user_id = $1 GROUP BY month`, [1])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e.stack));
};