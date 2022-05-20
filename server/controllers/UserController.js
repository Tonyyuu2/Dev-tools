const bcrypt = require("bcrypt");
const db = require('../db/db.js');
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

const salt = bcrypt.genSaltSync(10);

const hashpwd = (userPW) => {
  return bcrypt.hashSync(userPW, salt);
};

const generateToken = (id, secretKey) => {
  return jwt.sign({ id }, secretKey, { expiresIn: '2h' });
};

const getUserWithEmail = (email) => {

  if (!email) {
    return null;
  }

  const data = db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
    .then(result => result.rows[0])
    .catch(e => null);

  return data;

};

exports.registerUser = (req, res) => {

  const { firstname, lastname, email, password, git } = req.body;

  db.query('INSERT INTO users(firstname, lastname, email, password, github_id ) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, email, hashpwd(password), git])
    .then(result => {
      const user = result.rows[0];
      const accessToken = generateToken(user.id, secretKey);
      res.status(200).json({ username: user.firstname, id: user.id, token: accessToken });
    })
    .catch(e => console.error(e.stack));

};

exports.authenticateUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await getUserWithEmail(email);

    if (!user) {
      res.status(400).json({ msg: "email is incorrect" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = generateToken(user.id, secretKey);
      res.status(200).json({ username: user.firstname, id: user.id, token: accessToken });
    } else {
      res.status(200).json({ msg: "Please enter correct email and password" });
    }

  }
  catch (error) {
    res.status(400).json({ msg: "is incorrect" });
  }
};

exports.validateEmailAvailibility = async (req, res) => {

  const user = await getUserWithEmail(req.query.email);

  if (user) {
    res.json({ emailexists: true });
  } else {
    res.json({ email_exists: false });
  }

}; 