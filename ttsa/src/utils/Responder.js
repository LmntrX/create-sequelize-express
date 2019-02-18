"use strict";
module.exports = (res, code, message) => {
  try {
    if (!res._headerSent) return res.status(code).json(message);
    else console.log("Response was sent already");
  } catch (error) {
    console.error(error);
  }
  return null;
};
