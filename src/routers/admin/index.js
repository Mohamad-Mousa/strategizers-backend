let express = require("express");

const AdminRouter = require("./admin.router");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const AdminTypeRouter = require("./admin_type.router");
const AuthRouters = require("./auth.router");
const FunctionRouter = require("./function.router");
const WebsiteRouter = require("./website.router");
const ServiceRouter = require("./service.router");
const SettingRouter = require("./setting.router");
const TestimonialRouter = require("./testimonial.router");
const FAQRouter = require("./faq.router");
const PartnerRouter = require("./partner.router");
const BlogRouter = require("./blog.router");
const ContactRouter = require("./contact.router");
const ProjectRouter = require("./project.router");
const TeamRouter = require("./team.router");
const NewsletterRouter = require("./newsletter.router");
const ProposalRouter = require("./proposal.router");
const JobRouter = require("./job.router");
const JobApplicationRouter = require("./job_application.router");
const BookingRouter = require("./booking.router");

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
    new SettingRouter().configureRoutes(router);
    new TestimonialRouter().configureRoutes(router);
    new FAQRouter().configureRoutes(router);
    new PartnerRouter().configureRoutes(router);
    new BlogRouter().configureRoutes(router);
    new ContactRouter().configureRoutes(router);
    new ProjectRouter().configureRoutes(router);
    new TeamRouter().configureRoutes(router);
    new NewsletterRouter().configureRoutes(router);
    new ProposalRouter().configureRoutes(router);
    new JobRouter().configureRoutes(router);
    new JobApplicationRouter().configureRoutes(router);
    new BookingRouter().configureRoutes(router);

    app.use("/admin", router);
  }
}

module.exports = AdminRouters;
