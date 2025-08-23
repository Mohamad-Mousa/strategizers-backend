const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class TestimonialService extends BaseService {
  constructor() {
    super();
    this.Testimonial = this.models.Testimonial;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        $or: [
          { "name.en": { $regex: new RegExp(regexSearch, "i") } },
          { "name.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "position.en": { $regex: new RegExp(regexSearch, "i") } },
          { "position.ar": { $regex: new RegExp(regexSearch, "i") } },
        ],
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
    let result = await this.Testimonial.aggregate([
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
    const testimonial = await this.Testimonial.findOne({
      _id: id,
    });
    if (!testimonial) {
      throw new CustomError("Testimonial not found", 404);
    }
    return { testimonial };
  }

  async create(body, file) {
    if (file) {
      body.image = file.filename;
    }
    this.bodyValidationService.validateRequiredFields(body, [
      "name.en",
      "name.ar",
      "position.en",
      "position.ar",
      "description.en",
      "description.ar",
    ]);

    const testimonial = await this.Testimonial.create(body);
    return { testimonial };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }
    const testimonial = await this.Testimonial.findByIdAndUpdate(body._id, {
      ...body,
    });
    return { testimonial };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.Testimonial.deleteMany({
      _id: { $in: idArray },
    });
  }
}

module.exports = TestimonialService;
