const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const BaseService = require("../core/base.service");
const PrivilegeService = require("./privilege.service");

const config = require("../../config");
const MongoError = require("../core/mongo_error");
const CustomError = require("../core/custom_error.service");
const AuthCoreService = require("../core/auth.service");

class AuthService extends BaseService {
  constructor() {
    super();
    this.AuthCoreService = AuthCoreService;
    this.Admin = this.models.Admin;
    this.RefreshToken = this.models.RefreshToken;
    this.PrivilegeService = new PrivilegeService();
  }

  async refreshToken(token, admin, ip) {
    const accessToken = this.AuthCoreService.generateJwtToken(
      { _id: admin._id, type_id: admin.type_id, type: admin.type, ip },
      "1d"
    );
    const refreshToken = this.AuthCoreService.generateJwtToken(
      { _id: admin._id, type_id: admin.type_id, type: admin.type, ip },
      "7d"
    );
    await this.RefreshToken.updateOne(
      { token },
      { $set: { token: refreshToken } }
    );
    return { accessToken, refreshToken };
  }

  async authenticate(body, ip) {
    const admin = await this.Admin.findOne({ email: body.email })
      .select("password email type firstName lastName")
      .populate("type");
    if (!admin || !bcrypt.compareSync(body.password, admin.password)) {
      throw new CustomError("Username or password is incorrect", 401);
    }

    if (admin.isActive === false || admin.isDeleted === true) {
      throw new CustomError("Admin is not active or deleted", 401);
    }

    if (admin.type.isActive === false || admin.type.isDeleted === true) {
      throw new CustomError("Admin type is not active or deleted", 401);
    }

    const accessToken = this.AuthCoreService.generateJwtToken(
      { _id: admin._id, type_id: admin.type._id, type: admin.type.name, ip },
      "1d"
    );
    const refreshToken = this.AuthCoreService.generateJwtToken(
      { _id: admin._id, type_id: admin.type._id, type: admin.type.name, ip },
      "7d"
    );

    await this.RefreshToken({
      token: refreshToken,
      referenceId: admin._id,
      referenceType: "admin",
    }).save();

    await this.Admin.updateOne(
      { _id: admin._id },
      {
        $set: { lastLogin: new Date() },
        $push: { tokens: accessToken },
      }
    );

    const adminInfo = {
      _id: admin._id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      type: admin.type,
      image: admin.image,
    };

    const privileges = await this.findPrivileges(admin.type._id);

    return { admin: adminInfo, accessToken, refreshToken, privileges };
  }

  async logout(token, accessToken) {
    await this.Admin.updateOne(
      { tokens: { $in: [accessToken] } },
      { $pull: { tokens: accessToken } }
    );
    await this.RefreshToken.deleteOne({ token }).catch((error) => {
      throw new MongoError(error);
    });
  }

  async findPrivileges(admin_type_id) {
    return await this.PrivilegeService.findMany(admin_type_id);
  }
}

module.exports = AuthService;
