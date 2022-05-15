const db = require('../../server')


// Get all the journal_entries (non-user can access too) >> Browse
const getAllJournals = () => {
  return db.query(`SELECT * FROM journal_entries
  ORDER BY journal_entries.id DESC;`)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
};

// Get a selected journal_entries >> Read
const getSelectedJournal = (journal_entries_id) => {
  const queryString = `
  SELECT * FROM journal_entries
  WHERE journal_entries.id = $1
  `
  return db.query(queryString, [journal_entries_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}


// Edit a journal_entries >> Edit
const editJournal = (journal_entries_details) => {
  let queryParams = [];
  let setClause = [];
  let {id, title, description, tag, rating } = journal_entries_details;
  let queryString = `UPDATE journal_entries `;
  
  if (title) {
    queryParams.push(`${title}`)
    setClause.push(`title = $${queryParams.length}`)
  }

  if (description) {
    queryParams.push(`${description}`)
    setClause.push(`description = $${queryParams.length}`)
  }
  if (tag) {
    queryParams.push(`${tag}`)
    setClause.push(`tag = $${queryParams.length}`)
  }
  if (rating) {
    queryParams.push(`${rating}`)
    setClause.push(`rating = $${queryParams.length}`)
  }

  if(queryParams.length > 0) {
  queryString += `SET ` + setClause.join(`, `);
  };

  queryString += ` WHERE journal_entries.id = ${id}
                   RETURNING *;`;
                   
  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
  
}

// Creat a new journal_entries >> Add
const addJournal = (journal_entries_details) => {
  const {user_id, title, description, tag, status, rating} = journal_entries_details;
  const queryString = `
  INSERT INTO journal_entries (user_id, title, description, tag, status, rating, date_created)
  VALUES ($1, $2, $3, $4, NOW(), $5, $6)
  RETURNING *;
  `
  const queryParams = [user_id, title, description, tag, status, rating];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

}

// Delete a journal_entries >> Delete
const deletejournal_entries = (journal_entries_id) => {
  const queryString = `
  DELETE FROM journal_entries
  WHERE journal_entries.id = $1
  RETURNING *;
  `
  const queryParams = [journal_entries_id];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}


module.exports = {
  getAllJournals,
  getSelectedJournal,
  editJournal,
  addJournal,
  deletejournal_entries
}
