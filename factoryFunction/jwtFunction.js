const jwt = require("jsonwebtoken");

function sendJwt(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
}

module.exports = sendJwt;
