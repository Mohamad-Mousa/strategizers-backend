let express = require("express");

const ServiceRouter = require("./service.router");
const WebsiteRouter = require("./website.router");
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
const BookingRouter = require("./booking.router");
const CalendlyWebhookRouter = require("./calendly_webhook.router");

class PublicRouters {
  constructor() {}

  configureRoutes(app) {
    let router = express.Router();

    new ServiceRouter().configureRoutes(router);
    new WebsiteRouter().configureRoutes(router);
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
    new BookingRouter().configureRoutes(router);
    new CalendlyWebhookRouter().configureRoutes(router);
    app.use("/public", router);
  }
}

module.exports = PublicRouters;
