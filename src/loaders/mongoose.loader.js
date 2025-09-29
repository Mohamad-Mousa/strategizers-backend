const mongoose = require("mongoose");

const config = require("../config");

class MongooseLoader {
  static mongoose;
  static models = {};

  mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  static load() {
    this.mongoose = mongoose;
    this.mongoose.Promise = global.Promise;
    this.mongoose.set("strictQuery", false);
    let transform = (doc, ret, options) => {
      delete ret.__v;
      return ret;
    };
    this.mongoose.set("toObject", { transform });
    this.mongoose.set("toJSON", { transform });
    this.loadModels();
  }

  static loadModels() {
    this.models.Admin = require("../models/admin.model");
    this.models.UserLog = require("../models/user_log.model");
    this.models.AdminType = require("../models/admin_type.model");
    this.models.Privilege = require("../models/privilege.model");
    this.models.Function = require("../models/function.model");
    this.models.RefreshToken = require("../models/refresh_token.model");
    this.models.Website = require("../models/website.model");
    this.models.Service = require("../models/service.model");
    this.models.Setting = require("../models/setting.model");
    this.models.Testimonial = require("../models/testimonial.model");
    this.models.FAQ = require("../models/faq.model");
    this.models.Partner = require("../models/partner.model");
    this.models.Blog = require("../models/blog.model");
    this.models.Contact = require("../models/contact.model");
    this.models.Project = require("../models/project.model");
    this.models.Newsletter = require("../models/newsletter.model");
    this.models.Team = require("../models/team.model");
    this.models.Proposal = require("../models/proposal.model");
    this.models.Job = require("../models/job.model");
    this.models.JobApplication = require("../models/job_application.model");
    this.models.Booking = require("../models/booking.model");
    this.models.Program = require("../models/program.model");
    this.models.ProgramCategory = require("../models/program_category.model");
    this.models.Course = require("../models/course.model");
  }

  static connect() {
    return this.mongoose.connect(config.dbUrl, this.mongooseOptions);
  }

  static disconnect() {
    this.mongoose.disconnect();
  }
}

module.exports = MongooseLoader;
