const BaseService = require("../core/base.service");

class SettingService extends BaseService {
  constructor() {
    super();
    this.Setting = this.models.Setting;
  }

  async findMany(body) {
    const settings = await this.Setting.findOne();
    return { settings };
  }

  async update(body) {
    const settings = await this.Setting.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    return { settings };
  }
}

module.exports = SettingService;
