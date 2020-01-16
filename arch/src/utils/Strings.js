module.exports = {
  ERROR_MESSAGES: {
    EMAIL_AND_PASSWORD_REQUIRED: "Email and Password are required fields",
    NAME_AND_PHONE_REQUIRED: "Name and Phone are required fields",
    INVALID_EMAIL_ID: "Please check the email Id",
    AUTH_FAILURE: "Authentication Failed",
    SERVER_ERROR: "Server failed to process your request",
    DATA_NOT_FOUND: "Not Found",
    INVALID_ID: "Invalid Id. ID is in bad format or not present in database.",
    CONTAINS_SENSITIVE_INFORMATION:
      "Update body contains sensitive information",
    INVALID_PARAM: "Invalid parameter or queried data does not exist",
    EMPTY_UPDATE: "Body cannot be empty"
  },
  SUCCESS_MESSAGES: {
    SIGNUP_SUCCESS: "Signup Success",
    UPDATE_SUCCESS: "Update Complete",
    ROWS_DELETED: "Row/s Deleted",
    ROWS_UPDATED: "Row/s Updated"
  }
};
