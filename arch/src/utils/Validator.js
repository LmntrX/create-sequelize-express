const ResponseTemplates = require("./ResponseTemplate");
const Strings = require("./Strings");
module.exports = {
  error(err) {
    return {
      isValid: false,
      error: ResponseTemplates.badRequestTemplate(err)
    };
  },
  ok() {
    return {
      isValid: true,
      error: null
    };
  },
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }
};
