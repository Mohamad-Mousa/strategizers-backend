let express = require("express");

class PublicRouters {
  constructor() {}

  configureRoutes(app) {
    let router = express.Router();

    app.use("/public", router);
  }
}

module.exports = PublicRouters;
