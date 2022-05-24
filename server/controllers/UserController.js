const bcrypt = require("bcrypt");
const db = require('../db/db.js');
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

const salt = bcrypt.genSaltSync(10);
//encrypting the user password with bcrypt
const hashpwd = (userPW) => {
  return bcrypt.hashSync(userPW, salt);
};

//generating jwt for user
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

  const { firstname, lastname, email, password} = req.body;

  db.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *', [firstname, lastname, email, hashpwd(password)])
    .then(result => {
      const user = result.rows[0];
      const accessToken = generateToken(user.id, secretKey);
      res.status(200).json({ username: user.firstname, token: accessToken });
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
      res.status(200).json({ username: user.firstname, token: accessToken });
    } else {
      res.status(200).json({ msg: "Please enter correct email and password" });
    }

  }
  catch (error) {
    res.status(400).json({ msg: "is incorrect" });
  }
};

//Checks if email already exists in the database while user sign ups
exports.validateEmailAvailibility = async (req, res) => {

  const user = await getUserWithEmail(req.query.email);

  if (user) {
    res.json({ emailexists: true });
  } else {
    res.json({ email_exists: false });
  }

}; 