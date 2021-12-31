require('dotenv').config();
const jwt = require('jsonwebtoken');

function getToken(user) {
  // Generate token
  const id = user.id;
  const expiresIn = '24h';
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn,
  });
  return {
    token: signedToken,
    expires: expiresIn,
  };
}

// Check userId from token
function getUserId(req) {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.sub;
  return userId;
}

module.exports = {
  getToken,
  getUserId,
};
