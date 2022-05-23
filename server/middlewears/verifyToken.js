const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// middlewear to verify the token send by the user for private route access

const verifyToken = (req, res, next) => {

  if (!req.headers['authorization']) {
    return res.status(400).send({ message: 'Invalid login' });
  }

  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(400).send({ message: 'Invalid Token' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {

    if (err) {
      return res
        .status(400)
        .send({ message: 'Token verified' });
    }


    req.userid = decoded.id;
    next();
  });
};

module.exports = verifyToken;