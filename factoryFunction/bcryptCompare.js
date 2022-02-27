const bcrypt = require("bcryptjs");

async function bcryptCompare(passwordUser, passwordDB) {
  return bcrypt.compare(passwordUser, passwordDB);
}

module.exports = bcryptCompare;
