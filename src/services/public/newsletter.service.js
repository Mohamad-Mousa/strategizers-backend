const BaseService = require("../core/base.service");
const CustomError = require("../core/custom_error.service");

class NewsletterService extends BaseService {
  constructor() {
    super();
    this.Newsletter = this.models.Newsletter;
  }

  async create(body) {
    if (!body.email) {
      throw new CustomError("Email is required", 400);
    }
    const existingNewsletter = await this.Newsletter.exists({
      email: body.email,
    });
    if (existingNewsletter) {
      throw new CustomError("Email already subscribed", 400);
    }
    await this.Newsletter.create(body);
  }

  async delete(email) {
    if (!email) {
      throw new CustomError("Email is required", 400);
    }
    const existingNewsletter = await this.Newsletter.exists({
      email,
    });
    if (!existingNewsletter) {
      throw new CustomError("Email not found", 400);
    }
    await this.Newsletter.deleteOne({ email });
  }
}

module.exports = NewsletterService;
