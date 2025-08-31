const { mongoose, Content } = require("./model-template");

const Website = mongoose.model(
  "Website",
  new mongoose.Schema(
    {
      homePage: {
        banner: [
          {
            image: {
              type: String,
              required: true,
            },
            title: Content,
            description: Content,
          },
        ],
        welcomeSection: {
          title: Content,
          description: Content,
          featuredServices: [
            {
              title: Content,
              description: Content,
              image: {
                type: String,
                required: true,
              },
            },
          ],
        },
      },
      aboutPage: {
        banner: {
          type: String,
          required: true,
        },
        shortDescription: Content,
        longDescription: Content,
        mission: {
          title: Content,
          description: Content,
          image: {
            type: String,
            required: true,
          },
        },
        vision: {
          title: Content,
          description: Content,
          image: {
            type: String,
            required: true,
          },
        },
        values: {
          title: Content,
          description: Content,
          image: {
            type: String,
            required: true,
          },
        },
        ourSmartApproach: [
          {
            title: Content,
            subTitle: Content,
            description: Content,
            image: {
              type: String,
              required: true,
            },
          },
        ],
        oppertunitiesSection: {
          title: Content,
          description: Content,
        },
        historySection: {
          title: Content,
          timeline: [
            {
              title: Content,
              description: Content,
              date: Date,
              image: {
                type: String,
                required: true,
              },
            },
          ],
        },
      },
      servicePage: {
        banner: {
          type: String,
          required: true,
        },
      },
      blogPage: {
        banner: {
          type: String,
          required: true,
        },
      },
      projectPage: {
        banner: {
          type: String,
          required: true,
        },
      },
      contactPage: {
        banner: {
          type: String,
          required: true,
        },
      },
      teamPage: {
        banner: {
          type: String,
          required: true,
        },
      },
      faqPage: {
        banner: {
          type: String,
          required: true,
        },
      },
      testimonialPage: {
        banner: {
          type: String,
          required: true,
        },
      },
    },
    { timestamps: true }
  )
);

module.exports = Website;
