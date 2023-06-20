const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_TOKEN;

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true; // Return true for any verification errors
  }
};

const authToken = (req, res, next) => {
  // auth-token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  if (isTokenExpired(token)) {
    return res.status(402).send({ error: "Token has expired. Please authenticate again." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = authToken;
