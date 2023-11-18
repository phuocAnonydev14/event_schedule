const adminCheck = require("../middleware/admin.middleware.js");
const authenticateToken = require("../middleware/auth.middleware.js");

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.get("/", user.getAll);
  router.patch("/:id", user.update);
  router.delete("/:id", user.delete);
  router.patch("/inviteAdmin/:id", user.inviteAdmin);

  app.use("/api/user", authenticateToken, adminCheck, router);
};
