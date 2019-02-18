const bcrypt = require("bcrypt-nodejs");
module.exports = {
  async generatePasswordHash(password) {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  compareHashes(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
};
