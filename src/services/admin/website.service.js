const bcrypt = require("bcryptjs");
const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const handleUploadService = require("../core/handle_uploads.service");

class WebsiteService extends BaseService {
  constructor() {
    super();
    this.Website = this.models.Website;
    this.handleUploadService = handleUploadService;
  }

  async findMany() {
    let website = await this.Website.findOne();
    return website;
  }

  async update(body, files) {
    body = this.handleUploadService.handleFileUploads(body, files);

    console.log(body);

    const website = await this.Website.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return { website };
  }
}

module.exports = WebsiteService;
