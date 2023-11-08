const authenticateToken = require('../middleware/auth.middleware');

module.exports = app => {
  const event = require("../controllers/event.controller.js");

  const router = require("express").Router();

  router.get("/", event.getAll);

  app.use("/api/event",authenticateToken, router);
};