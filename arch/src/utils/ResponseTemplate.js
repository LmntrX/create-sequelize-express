const Constants = require("../utils/Constants");
const Strings = require("../utils/Strings");
module.exports = {
  successTemplate(message) {
    return {
      status: Constants.RESPONSE_CODES.REQUEST_OK,
      message: message
    };
  },
  serverErrorTemplate() {
    return this.errorTemplate(
      Constants.RESPONSE_CODES.SERVER_ERROR,
      Strings.ERROR_MESSAGES.SERVER_ERROR
    );
  },
  badRequestTemplate(error) {
    return this.errorTemplate(Constants.RESPONSE_CODES.BAD_REQUEST, error);
  },
  invalidParameterTemplate() {
    return this.badRequestTemplate(Strings.ERROR_MESSAGES.INVALID_PARAM);
  },
  unAuthorizedRequestTemplate() {
    return this.errorTemplate(
      Constants.RESPONSE_CODES.UN_AUTHORIZED,
      Strings.ERROR_MESSAGES.AUTH_FAILURE
    );
  },
  dataNotFoundTemplate(what) {
    return this.errorTemplate(
      Constants.RESPONSE_CODES.NOT_FOUND,
      `${what} ${Strings.ERROR_MESSAGES.DATA_NOT_FOUND}`
    );
  },
  errorTemplate(code, error) {
    return {
      status: code,
      error
    };
  },
  dataTemplate(data) {
    return {
      status: Constants.RESPONSE_CODES.REQUEST_OK,
      data
    };
  }
};
