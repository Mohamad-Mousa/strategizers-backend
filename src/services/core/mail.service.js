const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const MailTemplateService = require("./mail_template.service");
class MailService {
  static async send({ to, subject, template, attachments = [] }) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "compuvisionapp@gmail.com",
          pass: "utab tqag gbyi gfkc",
        },
      })
    );
    const mailOptions = {
      from: "info@varsity.com",
      to,
      subject,
      html: template,
      ...(attachments.length && { attachments }),
    };
    return await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err);
        else resolve(info);
      });
    });
  }

  static async sendVerificationCodeEmail(to, code) {
    const subject = "Confirm your email";
    const template = MailTemplateService.verificationCodeTemplate(code);
    return await MailService.send({to, subject, template});
  }

  static async sendChangePasswordEmail(to, token,isBusiness) {
    const subject = "Change your password";
    const template = MailTemplateService.changePasswordTemplate(token,isBusiness);
    return await MailService.send({to, subject, template});
  }

  static async sendChargeEmail(to,date,fromtime,totime,amount,currency,link) {
    const subject = "Down Payment";
    const template = MailTemplateService.chargePaymentTemplate(date,fromtime,totime,amount,currency,link);
    return await MailService.send({to, subject, template});
  }

  static async sendBankInfoEmail(to,date,fromtime,totime,amount,currency,link) {
    const subject = "Bank Footprint";
    const template = MailTemplateService.bankInfoTemplate(date,fromtime,totime,amount,currency,link);
    return await MailService.send({to, subject, template});
  }

}

module.exports = MailService;