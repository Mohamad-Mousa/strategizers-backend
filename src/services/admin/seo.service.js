const BaseService = require("../core/base.service");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class SeoService extends BaseService {
  constructor() {
    super();
    this.Seo = this.models.Seo;
    this.BodyValidationService = BodyValidationService;
  }

  async findMany() {
    let seo = await this.Seo.findOne();
    return seo;
  }

  async update(body) {
    this.BodyValidationService.validateRequiredFields(body, [
      "homePage.title.en",
      "homePage.title.ar",
      "homePage.description.en",
      "homePage.description.ar",
      "homePage.tags",
      "aboutPage.title.en",
      "aboutPage.title.ar",
      "aboutPage.description.en",
      "aboutPage.description.ar",
      "aboutPage.tags",
      "servicePage.title.en",
      "servicePage.title.ar",
      "servicePage.description.en",
      "servicePage.description.ar",
      "servicePage.tags",
      "blogPage.title.en",
      "blogPage.title.ar",
      "blogPage.description.en",
      "blogPage.description.ar",
      "blogPage.tags",
      "projectPage.title.en",
      "projectPage.title.ar",
      "projectPage.description.en",
      "projectPage.description.ar",
      "projectPage.tags",
      "contactPage.title.en",
      "contactPage.title.ar",
      "contactPage.description.en",
      "contactPage.description.ar",
      "contactPage.tags",
      "teamPage.title.en",
      "teamPage.title.ar",
      "teamPage.description.en",
      "teamPage.description.ar",
      "teamPage.tags",
      "faqPage.title.en",
      "faqPage.title.ar",
      "faqPage.description.en",
      "faqPage.description.ar",
      "faqPage.tags",
      "testimonialPage.title.en",
      "testimonialPage.title.ar",
      "testimonialPage.description.en",
      "testimonialPage.description.ar",
      "testimonialPage.tags",
      "termsPage.title.en",
      "termsPage.title.ar",
      "termsPage.description.en",
      "termsPage.description.ar",
      "termsPage.tags",
      "privacyPage.title.en",
      "privacyPage.title.ar",
      "privacyPage.description.en",
      "privacyPage.description.ar",
      "privacyPage.tags",
      "bookingPage.title.en",
      "bookingPage.title.ar",
      "bookingPage.description.en",
      "bookingPage.description.ar",
      "bookingPage.tags",
      "careerPage.title.en",
      "careerPage.title.ar",
      "careerPage.description.en",
      "careerPage.description.ar",
      "careerPage.tags",
      "coursePage.title.en",
      "coursePage.title.ar",
      "coursePage.description.en",
      "coursePage.description.ar",
      "coursePage.tags",
      "proposalPage.title.en",
      "proposalPage.title.ar",
      "proposalPage.description.en",
      "proposalPage.description.ar",
      "proposalPage.tags",
    ]);
    const seo = await this.Seo.findOneAndUpdate({}, body, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    if (!seo) {
      throw new CustomError("SEO configuration not found", 404);
    }

    return { seo };
  }
}

module.exports = SeoService;
