const bcrypt = require("bcrypt");

class Hashing {
  constructor(password) {
    const hashedPWD = bcrypt.hashSync(password, Math.random());
    return hashedPWD;
  }
}

class Authenticate {
  constructor(pass, savedPass) {
    const passwordAuth = bcrypt.compareSync(pass, savedPass);
    if (passwordAuth) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { Hashing, Authenticate };
