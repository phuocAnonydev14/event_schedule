const authenticateToken = require('../middleware/auth.middleware.js');

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.patch("/:id", user.update);

  app.use("/api/user",authenticateToken, router);
};
