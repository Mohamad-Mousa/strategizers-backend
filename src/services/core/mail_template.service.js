const config = require("../../config");

class MailTemplateService {

  static verificationCodeTemplate(randomCode) {
    const template = `Your verification code is <strong>${randomCode}</strong>`;
    return template;
  }

  static changePasswordTemplate(token, isBusiness) {
    const domain = config.env == "development" ? "http://localhost:4200" : "https://backend.com";
    const template = `Use this link to change your password <a href="${domain}/en/password/${token}?isBusiness=${isBusiness}">${domain}/en/password/${token}?isBusiness=${isBusiness}</a>`;
    return template;
  }

}

module.exports = MailTemplateService;