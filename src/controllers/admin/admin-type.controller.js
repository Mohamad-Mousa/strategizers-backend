const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const AdminTypeService = require("../../services/admin/admin_type.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class AdminTypeController {
  constructor() {
    this.adminTypeService = new AdminTypeService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const adminsTypes = await this.adminTypeService.findMany(req.query);
      ResponseService.success(res, "Success!", adminsTypes, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      await this.adminTypeService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.adminTypes,
        "Admin Created a new admin type."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.adminTypeService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.adminTypes,
        "Admin Updated an admin type."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.adminTypeService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.adminTypes,
        "Admin Deleted an admin type."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = AdminTypeController;
