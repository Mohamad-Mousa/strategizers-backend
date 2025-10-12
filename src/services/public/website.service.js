const BaseService = require("../core/base.service");

class WebsiteService extends BaseService {
  constructor() {
    super();
    this.Website = this.models.Website;
    this.Project = this.models.Project;
    this.Testimonial = this.models.Testimonial;
    this.Blog = this.models.Blog;
    this.Service = this.models.Service;
    this.Partner = this.models.Partner;
    this.Seo = this.models.Seo;
  }

  async findMany() {
    let website = await this.Website.findOne();
    const projects = await this.Project.find({ isActive: true })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "service",
        select: "title",
      })
      .limit(3);
    const testimonials = await this.Testimonial.find({
      isActive: true,
      isFeatured: true,
    }).limit(3);
    const blogs = await this.Blog.find({ isActive: true })
      .sort({
        createdAt: -1,
      })
      .limit(3);
    const services = await this.Service.find({
      isActive: true,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    const partners = await this.Partner.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    const seo = await this.Seo.findOne();

    website = website.toObject();
    website.homePage = {
      ...website.homePage,
      projects,
      testimonials,
      blogs,
      services,
      partners,
    };

    // Add SEO data to each page
    if (seo) {
      const pages = [
        "homePage",
        "aboutPage",
        "servicePage",
        "blogPage",
        "projectPage",
        "contactPage",
        "teamPage",
        "faqPage",
        "testimonialPage",
        "termsPage",
        "privacyPage",
      ];

      pages.forEach((page) => {
        if (website[page] && seo[page]) {
          website[page].seo = seo[page];
        }
      });
    }

    return website;
  }
}

module.exports = WebsiteService;
