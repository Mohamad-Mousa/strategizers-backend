const BaseService = require("../core/base.service");

class WebsiteService extends BaseService {
  constructor() {
    super();
    this.Website = this.models.Website;
  }

  async findMany() {
    let website = await this.Website.findOne();
    return website;
  }
}

module.exports = WebsiteService;
