let express = require("express");

const ServiceRouter = require("./service.router");
const WebsiteRouter = require("./website.router");

class PublicRouters {
  constructor() {}

  configureRoutes(app) {
    let router = express.Router();

    new ServiceRouter().configureRoutes(router);
    new WebsiteRouter().configureRoutes(router);

    app.use("/public", router);
  }
}

module.exports = PublicRouters;
