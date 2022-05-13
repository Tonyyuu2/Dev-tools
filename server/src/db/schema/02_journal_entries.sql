DROP TABLE IF EXISTS journal_entries CASCADE;

CREATE TABLE journal_entries(
  id SERIAL PRIMARY KEY NOT NULL,
  REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tag TEXT [],
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  rating INT NOT NULL
);