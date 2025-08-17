const BaseService = require("../core/base.service");
const HandleUploadService = require("../core/handle_uploads.service");

class SettingService extends BaseService {
  constructor() {
    super();
    this.Setting = this.models.Setting;
    this.handleUploadService = HandleUploadService;
  }

  async findMany(body) {
    const settings = await this.Setting.findOne();
    return { settings };
  }

  async update(body, files) {
    body = this.handleUploadService.handleFileUploads(body, files);
    const settings = await this.Setting.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    return { settings };
  }
}

module.exports = SettingService;
