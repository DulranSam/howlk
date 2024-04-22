const bcrypt = require("bcrypt");

class Hashing {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}

class Authenticate {
  static comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

module.exports = { Hashing, Authenticate };
