const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const AuthController = require("../controllers/auth");
const respond = require("../utils/Responder");

router.post("/signup", async (req, res) => {
  const response = await userController.signup(req.body);
  respond(res, response.status, response);
});

router.post("/login", async (req, res) => {
  const response = await userController.login(req.body);
  respond(res, response.status, response);
});

router.get("/test", AuthController.verifyToken, async (req, res) => {
  let user = await userController.getUser(
    {
      id: req.user_id
    },
    (limit_response = true)
  );
  respond(res, 200, user);
});

module.exports = router;
