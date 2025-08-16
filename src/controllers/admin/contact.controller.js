const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ContactService = require("../../services/admin/contact.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ContactController {
  constructor() {
    this.contactService = new ContactService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const contacts = await this.contactService.findMany(req.query);
      ResponseService.success(res, "Success!", contacts, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const contact = await this.contactService.findOne(req.params.id);
      ResponseService.success(res, "Success!", contact, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.contactService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.contacts,
        "Contact Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.contactService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.contacts,
        "Contact Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ContactController;
