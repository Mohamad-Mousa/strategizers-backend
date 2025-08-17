const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");
const MailService = require("../core/mail.service");

class NewsletterService extends BaseService {
  constructor() {
    super();
    this.Newsletter = this.models.Newsletter;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        email: { $regex: new RegExp(regexSearch, "i") },
      }),
    };

    let pipes = [];
    if (req_query.sortBy) {
      let dir = 1;
      if (req_query.sortDirection == "desc") dir = -1;
      let key = req_query.sortBy;
      pipes.push({ $sort: { [key]: dir } });
    } else {
      pipes.push({ $sort: { createdAt: -1 } });
    }

    let result = await this.Newsletter.aggregate([
      { $match: query },
      ...pipes,
      {
        $facet: {
          data: [
            { $skip: req_query.page ? (req_query.page - 1) * limit : 0 },
            { $limit: limit },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);
    let data = result[0].data;
    let totalCount = result[0].totalCount[0]
      ? result[0].totalCount[0].total
      : 0;
    return { data, totalCount };
  }

  async findOne(id) {
    const newsletter = await this.Newsletter.findOne({
      _id: id,
    });
    if (!newsletter) {
      throw new CustomError("Newsletter subscription not found", 404);
    }
    return { newsletter };
  }

  async create(body) {
    const { emails, subject, content } = body;

    if (!subject || !content) {
      throw new CustomError("Subject and content are required", 400);
    }

    if (!emails || emails.length === 0) {
      const allEmails = await this.Newsletter.distinct("email");

      if (allEmails.length === 0) {
        throw new CustomError("No newsletter subscriptions found", 404);
      }

      await Promise.all(
        allEmails.map((email) =>
          MailService.sendNewsletterEmail(email, subject, content)
        )
      );
    } else {
      const existingEmails = await this.Newsletter.distinct("email", {
        email: { $in: emails },
      });

      if (existingEmails.length === 0) {
        throw new CustomError(
          "None of the provided emails are subscribed",
          400
        );
      }

      await Promise.all(
        existingEmails.map((email) =>
          MailService.sendNewsletterEmail(email, subject, content)
        )
      );
    }
  }

  async delete(ids) {
    const idArray = ids.split(",");
    const result = await this.Newsletter.deleteMany({
      _id: { $in: idArray },
    });
    if (result.deletedCount === 0) {
      throw new CustomError("No newsletter subscriptions found to delete", 404);
    }
  }
}

module.exports = NewsletterService;
