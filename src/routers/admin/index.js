let express = require("express");

const AdminRouter = require("./admin.router");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const AdminTypeRouter = require("./admin_type.router");
const AuthRouters = require("./auth.router");
const FunctionRouter = require("./function.router");
const WebsiteRouter = require("./website.router");
const ServiceRouter = require("./service.router");

class AdminRouters {
  constructor() {
    this.authMiddleware = AuthMiddleware.isAdmin();
  }

  configureRoutes(app) {
    let router = express.Router();

    new AuthRouters().configureRoutes(router);

    router.use(this.authMiddleware);

    new AdminRouter().configureRoutes(router);
    new AdminTypeRouter().configureRoutes(router);
    new FunctionRouter().configureRoutes(router);
    new WebsiteRouter().configureRoutes(router);
    new ServiceRouter().configureRoutes(router);

    app.use("/admin", router);
  }
}

module.exports = AdminRouters;
