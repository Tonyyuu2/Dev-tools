INSERT INTO journal_entries(user_id, title, description, tags,  date_created) VALUES
(2, 'Started writing code for pomodoro timer', 'Watched a youtube tutorial about useContext hook and passed down state through this way.', ARRAY['front'], '2022-05-19'),
(2, 'Finished pomodoro, added seed data for DB', 'I created the model and data controllers along with the help of Shubham. Understanding the flow was a little difficult but we managed.', ARRAY['back', 'data'], '2022-05-20'),
(2, 'Manually tested application', 'I went through the flow to find any bugs. We should have used a testing framework but we chose not to due to the lack of time.', ARRAY['front', 'back', 'data'], '2022-05-21'),
(2, 'A day from hell', 'The git Gods did not smile upon us today.',Array[''], '2022-05-22');