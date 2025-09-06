const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class ProposalService extends BaseService {
  constructor() {
    super();
    this.Proposal = this.models.Proposal;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        $or: [
          { title: { $regex: new RegExp(regexSearch, "i") } },
          { firstName: { $regex: new RegExp(regexSearch, "i") } },
          { lastName: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
          { companyName: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.isRead !== undefined && {
        isRead: req_query.isRead === "true",
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

    let result = await this.Proposal.aggregate([
      { $match: query },
      ...pipes,
      {
        $project: {
          _id: 1,
          title: 1,
          firstName: 1,
          lastName: 1,
          jobTitle: 1,
          email: 1,
          phone: 1,
          country: 1,
          areaOfInterest: 1,
          industry: 1,
          companyName: 1,
          yearlyRevenue: 1,
          document: 1,
          comment: 1,
          isRead: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
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
    const proposal = await this.Proposal.findById(id);
    if (!proposal) {
      throw new CustomError("Proposal not found", 404);
    }
    return { proposal };
  }

  async update(body) {
    const proposal = await this.Proposal.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!proposal) {
      throw new CustomError("Proposal not found", 404);
    }

    return { proposal };
  }
}

module.exports = ProposalService;
