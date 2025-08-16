const BaseService = require("../core/base.service");

class SettingService extends BaseService {
  constructor() {
    super();
    this.Setting = this.models.Setting;
  }

  async findMany() {
    const settings = await this.Setting.findOne();
    return { settings };
  }
}

module.exports = SettingService;
