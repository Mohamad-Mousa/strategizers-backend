const BaseService = require("../core/base.service");
const BodyValidationService = require("../core/body_validation.service");

class ContactService extends BaseService {
  constructor() {
    super();
    this.Contact = this.models.Contact;
    this.bodyValidationService = BodyValidationService;
  }

  async create(body) {
    this.bodyValidationService.validateRequiredFields(body, [
      "fullName",
      "email",
      "subject",
      "message",
      "phone.code",
      "phone.number",
    ]);

    const contact = await this.Contact.create(body);
    return { contact };
  }
}

module.exports = ContactService;
