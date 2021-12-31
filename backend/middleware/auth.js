require('dotenv').config();
const jwt = require('jsonwebtoken');

//Extract token from Authorization header for checking userID
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);

    const timeLeft = decodedToken.exp - Date.now();

    if (Date.now() >= decodedToken.exp * 1000) {
      next();
      localStorage.clear();
      return res.status(401).json({ error: 'Token expired' });
    }

    next();
  } catch (err) {
    return false;
  }
};
