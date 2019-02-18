const cors = require("cors");
const auth = require("./auth");

module.exports = app => {
  app.use(cors()); // TODO: Remove in production

  // Auth endpoints
  app.use("/auth", auth);

  // 404
  app.all("*", (req, res) =>
    res.status(200).send({
      status: 200,
      message: "You are lost"
    })
  );
};
