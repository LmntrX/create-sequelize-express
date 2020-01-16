const User = require("../models").user;
const Strings = require("../utils/Strings");
const ResponseTemplates = require("../utils/ResponseTemplate");
const Commons = require("../utils/Commons");
const AuthController = require("../controllers/auth");

module.exports = {
  async signup(body) {
    if (!body.email || !body.password)
      return ResponseTemplates.badRequestTemplate(
        Strings.ERROR_MESSAGES.EMAIL_AND_PASSWORD_REQUIRED
      );

    // Salt hash password
    body.password = await Commons.generatePasswordHash(body.password);

    let err = null;
    let user = await User.create(body).catch(error => {
      err = error.errors
        ? ResponseTemplates.badRequestTemplate(error.errors[0].message)
        : ResponseTemplates.serverErrorTemplate();
    });

    if (err) return err;
    else
      return await ResponseTemplates.dataTemplate(
        await AuthController.createAndRegisterToken(user)
      );
  },
  async login(body) {
    if (!body.email || !body.password)
      return ResponseTemplates.badRequestTemplate(
        Strings.ERROR_MESSAGES.EMAIL_AND_PASSWORD_REQUIRED
      );

    let user = await this.getUser({ email: body.email });
    if (!user) return ResponseTemplates.unAuthorizedRequestTemplate();
    if (Commons.compareHashes(user, body.password))
      return await ResponseTemplates.dataTemplate(
        await AuthController.createAndRegisterToken(user)
      );
    else return ResponseTemplates.unAuthorizedRequestTemplate();
  },
  async getUser(filter, limit_response) {
    return limit_response
      ? await User.find({
          where: filter
        })
      : await User.find({
          where: filter
        });
  }
};
