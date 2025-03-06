require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const generateAccessToken = (data) => {
  return jwt.sign(data, secretKey);
};

const authenticateToken = (jwt_token, error, success) => {
  if (jwt_token == null) return error("Token not provided");
  jwt.verify(jwt_token, secretKey, (err, user) => {
    if (err) return error("Invalid token");
    success(user);
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
