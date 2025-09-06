const BaseService = require("../core/base.service");
const BodyValidationService = require("../core/body_validation.service");

class ProposalService extends BaseService {
  constructor() {
    super();
    this.Proposal = this.models.Proposal;
    this.bodyValidationService = BodyValidationService;
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title",
      "firstName",
      "lastName",
      "jobTitle",
      "email",
      "phone.code",
      "phone.number",
      "country",
      "areaOfInterest",
      "industry",
      "companyName",
      "yearlyRevenue",
    ]);

    if (file) {
      body.document = file.filename;
    }

    const proposal = await this.Proposal.create(body);
    return { proposal };
  }
}

module.exports = ProposalService;
