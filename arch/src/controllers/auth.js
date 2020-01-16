const jwt = require("jsonwebtoken");
const ResponseTemplates = require("../utils/ResponseTemplate");
const respond = require("../utils/Responder");
const Constants = require("../utils/Constants");
const User = require("../models").user;

module.exports = {
  async createAndRegisterToken(user) {
    let access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return {
      access_token
    };
  },
  verifyToken(req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token)
      return respond(
        res,
        Constants.RESPONSE_CODES.UN_AUTHORIZED,
        ResponseTemplates.unAuthorizedRequestTemplate()
      );
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return respond(
          res,
          401,
          ResponseTemplates.unAuthorizedRequestTemplate()
        );
      // if everything good, save to request for use in other routes
      req.user = await User.find({
        where: { id: req.user_id }
      }).catch(error => {
        console.error(error);
        return respond(
          res,
          Constants.RESPONSE_CODES.UN_AUTHORIZED,
          ResponseTemplates.unAuthorizedRequestTemplate()
        );
      });
      next();
    });
  }
};
