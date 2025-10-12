const { mongoose, Content } = require("./model-template");

const Seo = mongoose.model(
  "Seo",
  new mongoose.Schema(
    {
      homePage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      aboutPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      servicePage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      blogPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      projectPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      contactPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      teamPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      faqPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      testimonialPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      termsPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      privacyPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      bookingPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      careerPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      coursePage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
      proposalPage: {
        title: Content,
        description: Content,
        tags: [Content],
      },
    },
    { timestamps: true }
  )
);

module.exports = Seo;
