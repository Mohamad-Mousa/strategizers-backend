const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const SettingService = require("../../services/admin/setting.service");

class SettingController {
  constructor() {
    this.settingService = new SettingService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const settings = await this.settingService.findMany();
      ResponseService.success(res, "Success!", settings, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      const settings = await this.settingService.update(req.body);
      ResponseService.success(res, "Success!", settings, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = SettingController;
