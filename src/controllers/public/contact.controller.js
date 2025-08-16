const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ContactService = require("../../services/public/contact.service");

class ContactController {
  constructor() {
    this.contactService = new ContactService();
  }

  create = asyncHandler(async (req, res) => {
    try {
      const contact = await this.contactService.create(req.body);
      ResponseService.success(
        res,
        "Contact message sent successfully!",
        contact,
        200
      );
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ContactController;
