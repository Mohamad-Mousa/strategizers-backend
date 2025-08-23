const bcrypt = require("bcryptjs");
const BaseService = require("../core/base.service");
const AuthAdminService = require("./auth.service");
const StringFormatter = require("../core/string_formatter");

class AdminService extends BaseService {
  constructor() {
    super();
    this.Admin = this.models.Admin;
    this.AuthAdminService = new AuthAdminService();
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      isDeleted: false,
      ...(req_query.term && {
        $or: [
          { firstName: { $regex: new RegExp(regexSearch, "i") } },
          { lastName: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.type && { type: this.ObjectId(req_query.type) }),
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
    let result = await this.Admin.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "admintypes",
          let: { adminTypeId: "$type" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$adminTypeId"] } } }],
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          type: 1,
          email: 1,
          phone: 1,
          image: 1,
          isActive: 1,
          isDeleted: 1,
        },
      },
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

  async create(body, file) {
    if (file) {
      body.image = file.filename;
    }

    console.log(body);

    const password = bcrypt.hashSync(body.password, 8);

    let admin = await this.Admin({
      ...body,
      password,
      type: this.ObjectId(body.type),
    }).save();

    return { admin };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }

    if (body.email) {
      const existingAdmin = await this.Admin.findOne({
        email: body.email,
        _id: { $ne: body._id },
        isDeleted: false,
      });
      if (existingAdmin) {
        throw new Error("Email already exists");
      }
    }

    if (body.password && body.password != "") {
      body.password = bcrypt.hashSync(body.password, 8);
    }

    await this.Admin.updateOne({ _id: body._id }, body);
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.Admin.updateMany({ _id: { $in: ids } }, { isDeleted: true });
  }
}

module.exports = AdminService;
