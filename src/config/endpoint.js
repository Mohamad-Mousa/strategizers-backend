module.exports = {
  endpoints: [
    // Admin Endpoints
    {
      folder: "Admins",
      auth: { type: "bearer", token: "{{adminToken}}" },
      items: [
        {
          folder: "Auth",
          auth: null,
          items: [
            {
              name: "Authenticate",
              method: "POST",
              url: "{{local}}/admin/auth/authenticate",
              bodyType: "raw",
              body: {
                email: "superadmin@gmail.com",
                password: "P@ssw0rd",
              },
              script: {
                type: "test",
                exec: [
                  "const response = pm.response.json();",
                  "if (response.results && response.results.accessToken) {",
                  '    pm.collectionVariables.set("adminToken", response.results.accessToken);',
                  "}",
                ],
              },
              params: [],
            },
            {
              name: "Refresh Token",
              method: "POST",
              url: "{{local}}/admin/auth/refresh-token",
              bodyType: "raw",
              body: {},
              script: {
                type: "test",
                exec: [
                  "const response = pm.response.json();",
                  "if (response.results && response.results.accessToken) {",
                  '    pm.collectionVariables.set("adminToken", response.results.accessToken);',
                  "}",
                ],
              },
              params: [],
            },
            {
              name: "Logout",
              method: "POST",
              url: "{{local}}/admin/auth/logout",
              params: [],
            },
          ],
        },
        {
          folder: "Admins",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/admins",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "type", value: "", type: "query" },
              ],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/admins",
              bodyType: "form-data",
              fields: [
                {
                  key: "firstName",
                  value: "John Doe",
                  type: "text",
                },
                {
                  key: "lastName",
                  value: "Doe",
                  type: "text",
                },
                {
                  key: "email",
                  value: "superadmin@gmail.com",
                  type: "text",
                },
                {
                  key: "password",
                  value: "P@ssw0rd",
                  type: "text",
                },
                {
                  key: "type",
                  value: "<id>",
                  type: "text",
                },
                {
                  key: "image",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "isActive",
                  value: "true",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/admins/update",
              bodyType: "form-data",
              fields: [
                {
                  key: "_id",
                  value: "<id>",
                  type: "text",
                },
                {
                  key: "firstName",
                  value: "John Doe",
                  type: "text",
                },
                {
                  key: "lastName",
                  value: "Doe",
                  type: "text",
                },
                {
                  key: "email",
                  value: "superadmin@gmail.com",
                  type: "text",
                },
                {
                  key: "password",
                  value: "P@ssw0rd",
                  type: "text",
                },
                {
                  key: "type",
                  value: "<id>",
                  type: "text",
                },
                {
                  key: "image",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "isActive",
                  value: "true",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/admins/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Admin Types",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/admin-type",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
              ],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/admin-type",
              bodyType: "raw",
              body: {
                name: "<string>",
                privileges: {
                  function_id: {
                    read: true,
                    write: true,
                    update: true,
                    delete: true,
                  },
                },
              },
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/admin-type/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                name: "<string>",
                privileges: {
                  function_id: {
                    read: true,
                    write: true,
                    update: true,
                    delete: true,
                  },
                },
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/admin-type/delete/:id",
              params: [],
            },
          ],
        },
        {
          folder: "Functions",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/function",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
              ],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/function",
              bodyType: "raw",
              body: {
                name: "<string>",
                key: "<string>",
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/function/delete/:id",
              params: [],
            },
          ],
        },
        {
          folder: "User Logs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/user-log",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "admin_id", value: "", type: "query" },
              ],
            },
          ],
        },
        {
          folder: "Website",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/website",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/website/update",
              bodyType: "form-data",
              fields: [
                {
                  key: "homePage[banner][0][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "homePage[banner][0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[banner][0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[banner][0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[banner][0][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][featuredServices][0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][featuredServices][0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][featuredServices][0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][featuredServices][0][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "homePage[welcomeSection][featuredServices][0][image]",
                  value: "image.png",
                  type: "file",
                },
                // about page
                {
                  key: "aboutPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[shortDescription][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[shortDescription][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[longDescription][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[longDescription][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[mission][title][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[mission][title][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[mission][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[mission][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[mission][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[vision][title][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[vision][title][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[vision][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[vision][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[vision][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[values][title][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[values][title][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[values][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[values][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[values][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][subTitle][en]",
                  value: "subTitle",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][subTitle][ar]",
                  value: "subTitle",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[ourSmartApproach][0][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[oppertunitiesSection][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[oppertunitiesSection][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[oppertunitiesSection][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[oppertunitiesSection][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[oppertunitiesSection][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "aboutPage[historySection][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][date]",
                  value: "date",
                  type: "text",
                },
                {
                  key: "aboutPage[historySection][timeline][0][image]",
                  value: "image.png",
                  type: "file",
                },
                // service page
                {
                  key: "servicePage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // blog page
                {
                  key: "blogPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // project page
                {
                  key: "projectPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // contact page
                {
                  key: "contactPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // team page
                {
                  key: "teamPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // faq page
                {
                  key: "faqPage[banner]",
                  value: "image.png",
                  type: "file",
                },
                // testimonial page
                {
                  key: "testimonialPage[banner]",
                  value: "image.png",
                  type: "file",
                },
              ],
              params: [],
            },
          ],
        },
        {
          folder: "Services",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/service",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/service/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/service",
              bodyType: "form-data",
              fields: [
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                {
                  key: "shortDescription[en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "shortDescription[ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "longDescription[en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "longDescription[ar]",
                  value: "description",
                  type: "text",
                },
                { key: "banner", value: "image.png", type: "file" },
                { key: "image", value: "image.png", type: "file" },
                { key: "icon", value: "icon", type: "text" },
                {
                  key: "subServices[0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "subServices[0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "subServices[0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "subServices[0][description][ar]",
                  value: "description",
                  type: "text",
                },
                { key: "subServices[0][icon]", value: "icon", type: "text" },
                {
                  key: "benefits[description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "benefits[description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "benefits[features][0][en]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][0][ar]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1][en]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1][ar]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[video]",
                  value: "video.mp4",
                  type: "text",
                },
                {
                  key: "brochure[pdf]",
                  value: "brochure.pdf",
                  type: "file",
                },
                {
                  key: "brochure[document]",
                  value: "brochure.docx",
                  type: "file",
                },
                {
                  key: "isActive",
                  value: "true",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/service/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                {
                  key: "shortDescription[en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "shortDescription[ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "longDescription[en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "longDescription[ar]",
                  value: "description",
                  type: "text",
                },
                { key: "banner", value: "image.png", type: "file" },
                { key: "image", value: "image.png", type: "file" },
                { key: "icon", value: "icon", type: "text" },
                {
                  key: "subServices[0][title][en]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "subServices[0][title][ar]",
                  value: "title",
                  type: "text",
                },
                {
                  key: "subServices[0][description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "subServices[0][description][ar]",
                  value: "description",
                  type: "text",
                },
                { key: "subServices[0][icon]", value: "icon", type: "text" },
                {
                  key: "benefits[description][en]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "benefits[description][ar]",
                  value: "description",
                  type: "text",
                },
                {
                  key: "benefits[features][0][en]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][0][ar]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1][en]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1][ar]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[video]",
                  value: "video.mp4",
                  type: "text",
                },
                {
                  key: "brochure[pdf]",
                  value: "brochure.pdf",
                  type: "file",
                },
                {
                  key: "brochure[document]",
                  value: "brochure.docx",
                  type: "file",
                },
                {
                  key: "isActive",
                  value: "true",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/service/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Sub-Services",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/sub-service",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/sub-service/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/sub-service",
              bodyType: "raw",
              body: {
                title: {
                  en: "Workforce Strategy & Planning",
                  ar: "استراتيجية وتخطيط القوى العاملة",
                },
                outcome: {
                  en: "Strategy-Ready Workforce Capacity",
                  ar: "قدرة قوى عاملة جاهزة للاستراتيجية",
                },
                oneLineValuePromise: {
                  en: "Build a clear, cost-aware workforce plan that protects delivery by aligning demand, supply, and critical roles.",
                  ar: "بناء خطة قوى عاملة واضحة وواعية بالتكلفة تحمي التسليم من خلال مواءمة الطلب والعرض والأدوار الحرجة.",
                },
                strategicIssuesWeResolve: [
                  {
                    en: "Headcount decisions are reactive; capacity is always \"too late.\"",
                    ar: "قرارات عدد الموظفين رد فعلية؛ القدرة دائماً \"متأخرة جداً\".",
                  },
                  {
                    en: "Critical roles are overloaded; delivery slips and quality drops.",
                    ar: "الأدوار الحرجة مثقلة؛ التسليم يتأخر والجودة تنخفض.",
                  },
                  {
                    en: "Growth plans exist, but workforce and cost assumptions don't.",
                    ar: "خطط النمو موجودة، لكن افتراضات القوى العاملة والتكلفة غير موجودة.",
                  },
                ],
                whatYouGet: [
                  {
                    en: "Workforce demand/supply model + scenarios (growth / efficiency / transformation).",
                    ar: "نموذج طلب/عرض القوى العاملة + سيناريوهات (نمو / كفاءة / تحول).",
                  },
                  {
                    en: "Critical roles map + build/buy/borrow plan and hiring priorities.",
                    ar: "خريطة الأدوار الحرجة + خطة بناء/شراء/استعارة وأولويات التوظيف.",
                  },
                  {
                    en: "Workforce roadmap with cost implications and governance cadence.",
                    ar: "خارطة طريق القوى العاملة مع تداعيات التكلفة وإيقاع الحوكمة.",
                  },
                ],
                service: "<serviceId>",
                icon: "",
                isActive: true,
              },
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/sub-service/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                title: {
                  en: "Workforce Strategy & Planning",
                  ar: "استراتيجية وتخطيط القوى العاملة",
                },
                outcome: {
                  en: "Strategy-Ready Workforce Capacity",
                  ar: "قدرة قوى عاملة جاهزة للاستراتيجية",
                },
                oneLineValuePromise: {
                  en: "Build a clear, cost-aware workforce plan that protects delivery by aligning demand, supply, and critical roles.",
                  ar: "بناء خطة قوى عاملة واضحة وواعية بالتكلفة تحمي التسليم من خلال مواءمة الطلب والعرض والأدوار الحرجة.",
                },
                strategicIssuesWeResolve: [
                  {
                    en: "Headcount decisions are reactive; capacity is always \"too late.\"",
                    ar: "قرارات عدد الموظفين رد فعلية؛ القدرة دائماً \"متأخرة جداً\".",
                  },
                  {
                    en: "Critical roles are overloaded; delivery slips and quality drops.",
                    ar: "الأدوار الحرجة مثقلة؛ التسليم يتأخر والجودة تنخفض.",
                  },
                  {
                    en: "Growth plans exist, but workforce and cost assumptions don't.",
                    ar: "خطط النمو موجودة، لكن افتراضات القوى العاملة والتكلفة غير موجودة.",
                  },
                ],
                whatYouGet: [
                  {
                    en: "Workforce demand/supply model + scenarios (growth / efficiency / transformation).",
                    ar: "نموذج طلب/عرض القوى العاملة + سيناريوهات (نمو / كفاءة / تحول).",
                  },
                  {
                    en: "Critical roles map + build/buy/borrow plan and hiring priorities.",
                    ar: "خريطة الأدوار الحرجة + خطة بناء/شراء/استعارة وأولويات التوظيف.",
                  },
                  {
                    en: "Workforce roadmap with cost implications and governance cadence.",
                    ar: "خارطة طريق القوى العاملة مع تداعيات التكلفة وإيقاع الحوكمة.",
                  },
                ],
                service: "<serviceId>",
                icon: "",
                isActive: true,
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/sub-service/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Settings",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/setting",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/setting/update",
              bodyType: "form-data",
              fields: [
                { key: "contact[email]", value: "email", type: "text" },
                {
                  key: "contact[phone][number]",
                  value: "phone.number",
                  type: "text",
                },
                {
                  key: "contact[phone][code]",
                  value: "phone.code",
                  type: "text",
                },
                { key: "contact[address]", value: "address", type: "text" },
                { key: "contact[map]", value: "map", type: "text" },
                { key: "social[facebook]", value: "facebook", type: "text" },
                { key: "social[instagram]", value: "instagram", type: "text" },
                { key: "social[twitter]", value: "twitter", type: "text" },
                { key: "social[linkedin]", value: "linkedin", type: "text" },
                { key: "social[youtube]", value: "youtube", type: "text" },
                { key: "social[tiktok]", value: "tiktok", type: "text" },
                {
                  key: "contactTeam[0][name][en]",
                  value: "name",
                  type: "text",
                },
                {
                  key: "contactTeam[0][name][ar]",
                  value: "name",
                  type: "text",
                },
                {
                  key: "contactTeam[0][position][en]",
                  value: "position",
                  type: "text",
                },
                {
                  key: "contactTeam[0][position][ar]",
                  value: "position",
                  type: "text",
                },
                {
                  key: "contactTeam[0][image]",
                  value: "image.png",
                  type: "file",
                },
                {
                  key: "contactTeam[0][phone][number]",
                  value: "phone.number",
                  type: "text",
                },
                {
                  key: "contactTeam[0][phone][code]",
                  value: "phone.code",
                  type: "text",
                },
                { key: "contactTeam[0][email]", value: "email", type: "text" },
                {
                  key: "legal[privacyPolicy][en]",
                  value: "privacyPolicy",
                  type: "text",
                },
                {
                  key: "legal[privacyPolicy][ar]",
                  value: "privacyPolicy",
                  type: "text",
                },
                {
                  key: "legal[termsAndConditions][en]",
                  value: "termsAndConditions",
                  type: "text",
                },
                {
                  key: "legal[termsAndConditions][ar]",
                  value: "termsAndConditions",
                  type: "text",
                },
              ],
              params: [],
            },
          ],
        },
        {
          folder: "Testimonials",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/testimonial",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/testimonial/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/testimonial",
              bodyType: "form-data",
              fields: [
                { key: "name[en]", value: "name", type: "text" },
                { key: "name[ar]", value: "name", type: "text" },
                { key: "position[en]", value: "position", type: "text" },
                { key: "position[ar]", value: "position", type: "text" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "isFeatured", value: "true", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/testimonial/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "name[en]", value: "name", type: "text" },
                { key: "name[ar]", value: "name", type: "text" },
                { key: "position[en]", value: "position", type: "text" },
                { key: "position[ar]", value: "position", type: "text" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "isFeatured", value: "true", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/testimonial/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "FAQs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/faq",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/faq/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/faq",
              bodyType: "raw",
              body: {
                question: {
                  en: "<string>",
                  ar: "<string>",
                },
                answer: {
                  en: "<string>",
                  ar: "<string>",
                },
                isActive: "true",
              },
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/faq/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                question: {
                  en: "<string>",
                  ar: "<string>",
                },
                answer: {
                  en: "<string>",
                  ar: "<string>",
                },
                isActive: "true",
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/faq/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Partners",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/partner",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/partner/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/partner",
              bodyType: "form-data",
              fields: [
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/partner/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/partner/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Blogs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/blog",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/blog/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/blog",
              bodyType: "form-data",
              fields: [
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                { key: "subTitle[en]", value: "subTitle", type: "text" },
                { key: "subTitle[ar]", value: "subTitle", type: "text" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "service", value: "", type: "text" },
                { key: "author", value: "", type: "text" },
                { key: "contacts[0]", value: "<teamId>", type: "text" },
                { key: "contacts[1]", value: "<teamId>", type: "text" },
                { key: "tags[0][en]", value: "", type: "text" },
                { key: "tags[0][ar]", value: "", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/blog/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                { key: "subTitle[en]", value: "subTitle", type: "text" },
                { key: "subTitle[ar]", value: "subTitle", type: "text" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "service", value: "", type: "text" },
                { key: "author", value: "", type: "text" },
                { key: "contacts[0]", value: "<teamId>", type: "text" },
                { key: "contacts[1]", value: "<teamId>", type: "text" },
                { key: "tags[0][en]", value: "", type: "text" },
                { key: "tags[0][ar]", value: "", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/blog/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Contacts",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/contact",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "isRead", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/contact/:id",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/contact/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                isRead: "true",
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/contact/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Projects",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/project",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
                { key: "isActive", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/project/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/project",
              bodyType: "form-data",
              fields: [
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                {
                  key: "shortDescription[en]",
                  value: "shortDescription",
                  type: "text",
                },
                {
                  key: "shortDescription[ar]",
                  value: "shortDescription",
                  type: "text",
                },
                { key: "image", value: "image.png", type: "file" },
                { key: "service", value: "", type: "text" },
                { key: "customer", value: "", type: "text" },
                { key: "link", value: "", type: "text" },
                {
                  key: "projectAnalysis[description][en]",
                  value: "projectAnalysis",
                  type: "text",
                },
                {
                  key: "projectAnalysis[description][ar]",
                  value: "projectAnalysis",
                  type: "text",
                },
                {
                  key: "projectAnalysis[image]",
                  value: "projectAnalysis",
                  type: "file",
                },
                {
                  key: "projectSolutions[description][en]",
                  value: "projectSolutions",
                  type: "text",
                },
                {
                  key: "projectSolutions[description][ar]",
                  value: "projectSolutions",
                  type: "text",
                },
                {
                  key: "projectSolutions[image]",
                  value: "projectSolutions",
                  type: "file",
                },
                {
                  key: "projectResults[description][en]",
                  value: "projectResults",
                  type: "text",
                },
                {
                  key: "projectResults[description][ar]",
                  value: "projectResults",
                  type: "text",
                },
                {
                  key: "projectResults[image]",
                  value: "projectResults",
                  type: "file",
                },
                { key: "date", value: "", type: "text" },
                { key: "tags[0][en]", value: "", type: "text" },
                { key: "tags[0][ar]", value: "", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/project/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "title[en]", value: "title", type: "text" },
                { key: "title[ar]", value: "title", type: "text" },
                {
                  key: "shortDescription[en]",
                  value: "shortDescription",
                  type: "text",
                },
                {
                  key: "shortDescription[ar]",
                  value: "shortDescription",
                  type: "text",
                },
                { key: "image", value: "image.png", type: "file" },
                { key: "service", value: "", type: "text" },
                { key: "customer", value: "", type: "text" },
                { key: "link", value: "", type: "text" },
                {
                  key: "projectAnalysis[en]",
                  value: "projectAnalysis",
                  type: "text",
                },
                {
                  key: "projectAnalysis[ar]",
                  value: "projectAnalysis",
                  type: "text",
                },
                {
                  key: "projectSolutions[en]",
                  value: "projectSolutions",
                  type: "text",
                },
                {
                  key: "projectSolutions[ar]",
                  value: "projectSolutions",
                  type: "text",
                },
                {
                  key: "projectResults[en]",
                  value: "projectResults",
                  type: "text",
                },
                {
                  key: "projectResults[ar]",
                  value: "projectResults",
                  type: "text",
                },
                { key: "date", value: "", type: "text" },
                { key: "tags[0][en]", value: "", type: "text" },
                { key: "tags[0][ar]", value: "", type: "text" },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/project/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Teams",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/team",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/team/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/team",
              bodyType: "form-data",
              fields: [
                { key: "name[en]", value: "name", type: "text" },
                { key: "name[ar]", value: "name", type: "text" },
                { key: "position[en]", value: "position", type: "text" },
                { key: "position[ar]", value: "position", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "phone[code]", value: "phone.code", type: "text" },
                { key: "phone[number]", value: "phone.number", type: "text" },
                { key: "email", value: "", type: "text" },
                {
                  key: "social[facebook]",
                  value: "social.facebook",
                  type: "text",
                },
                {
                  key: "social[instagram]",
                  value: "social.instagram",
                  type: "text",
                },
                {
                  key: "social[linkedin]",
                  value: "social.linkedin",
                  type: "text",
                },
                {
                  key: "social[twitter]",
                  value: "social.twitter",
                  type: "text",
                },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/team/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "id", type: "text" },
                { key: "name[en]", value: "name", type: "text" },
                { key: "name[ar]", value: "name", type: "text" },
                { key: "position[en]", value: "position", type: "text" },
                { key: "position[ar]", value: "position", type: "text" },
                { key: "image", value: "image.png", type: "file" },
                { key: "description[en]", value: "description", type: "text" },
                { key: "description[ar]", value: "description", type: "text" },
                { key: "phone[code]", value: "phone.code", type: "text" },
                { key: "phone[number]", value: "phone.number", type: "text" },
                { key: "email", value: "", type: "text" },
                {
                  key: "social[facebook]",
                  value: "social.facebook",
                  type: "text",
                },
                {
                  key: "social[instagram]",
                  value: "social.instagram",
                  type: "text",
                },

                {
                  key: "social[linkedin]",
                  value: "social.linkedin",
                  type: "text",
                },

                {
                  key: "social[twitter]",
                  value: "social.twitter",
                  type: "text",
                },
                { key: "isActive", value: "true", type: "text" },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/team/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Newsletter",
          auth: null,
          items: [
            {
              name: "find Many",
              method: "GET",
              url: "{{local}}/admin/newsletter",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/newsletter/:id",
              params: [],
            },
            {
              name: "Broadcast",
              method: "POST",
              url: "{{local}}/admin/newsletter",
              bodyType: "raw",
              body: {
                emails: ["<email1>", "<email2>", "<email3>"],
                subject: "<string>",
                content: "<string>",
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/newsletter/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Proposals",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/proposal",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/proposal/:id",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/proposal/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                isRead: "true",
              },
              params: [],
            },
          ],
        },
        {
          folder: "Jobs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/job",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "sortBy", value: "title", type: "query" },
                { key: "sortDirection", value: "asc", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/job/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/job",
              bodyType: "form-data",
              fields: [
                { key: "title", value: "Job Title", type: "text" },
                { key: "description", value: "Job Description", type: "text" },
                { key: "type", value: "full-time", type: "text" },
                {
                  key: "responsibilities[0]",
                  value: "Responsibilities",
                  type: "text",
                },
                { key: "requirements[0]", value: "Requirements", type: "text" },
                { key: "image", value: "path/to/image.jpg", type: "file" },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/job/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "<id>", type: "text" },
                { key: "title", value: "Updated Job Title", type: "text" },
                {
                  key: "description",
                  value: "Updated Job Description",
                  type: "text",
                },
                { key: "type", value: "full-time", type: "text" },
                {
                  key: "responsibilities[0]",
                  value: "Updated Responsibilities",
                  type: "text",
                },
                {
                  key: "requirements[0]",
                  value: "Updated Requirements",
                  type: "text",
                },
                {
                  key: "image",
                  value: "path/to/updated-image.jpg",
                  type: "file",
                },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/job/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Job Applications",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/job-application",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "job", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/job-application/:id",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/job-application/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                isRead: true,
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/job-application/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Booking",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/booking",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "status", value: "", type: "query" },
                { key: "isRead", value: "", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/booking/:id",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/booking/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                status: "<status>",
                isRead: "<boolean>",
                meetingNotes: "<string>",
                discussionPoints: "<string>",
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/booking/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Academy Categories",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/academy-category",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/academy-category/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/academy-category",
              bodyType: "raw",
              body: {
                title: {
                  en: "<string>",
                  ar: "<string>",
                },
              },
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/academy-category/update",
              bodyType: "raw",
              body: {
                _id: "<id>",
                title: {
                  en: "<string>",
                  ar: "<string>",
                },
              },
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/academy-category/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Courses",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/course",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "academyCategory", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/admin/course/:id",
              params: [],
            },
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/admin/course",
              bodyType: "form-data",
              fields: [
                { key: "title[en]", value: "Course Title", type: "text" },
                { key: "title[ar]", value: "Course Title", type: "text" },
                {
                  key: "programOverview[en]",
                  value: "Program overview text",
                  type: "text",
                },
                {
                  key: "programOverview[ar]",
                  value: "Program overview text",
                  type: "text",
                },
                {
                  key: "programObjectives[0][en]",
                  value: "Objective 1",
                  type: "text",
                },
                {
                  key: "programObjectives[0][ar]",
                  value: "الهدف 1",
                  type: "text",
                },
                {
                  key: "targetAudience[0][en]",
                  value: "Audience 1",
                  type: "text",
                },
                {
                  key: "targetAudience[0][ar]",
                  value: "الجمهور 1",
                  type: "text",
                },
                {
                  key: "expectedOrganizationalBenefits[0][en]",
                  value: "Benefit 1",
                  type: "text",
                },
                {
                  key: "expectedOrganizationalBenefits[0][ar]",
                  value: "الفائدة 1",
                  type: "text",
                },
                {
                  key: "programDuration[en]",
                  value: "2 to 3 days",
                  type: "text",
                },
                {
                  key: "programDuration[ar]",
                  value: "2 to 3 days",
                  type: "text",
                },
                {
                  key: "programDurationDetails[en]",
                  value: "Optional details",
                  type: "text",
                },
                {
                  key: "programDurationDetails[ar]",
                  value: "Optional details",
                  type: "text",
                },
                {
                  key: "deliveryFormat[0][en]",
                  value: "In-person",
                  type: "text",
                },
                {
                  key: "deliveryFormat[0][ar]",
                  value: "حضوري",
                  type: "text",
                },
                {
                  key: "programMethodology[0][en]",
                  value: "Facilitated learning",
                  type: "text",
                },
                {
                  key: "programMethodology[0][ar]",
                  value: "تعلم ميسر",
                  type: "text",
                },
                {
                  key: "programOutline[0][title][en]",
                  value: "Module 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][title][ar]",
                  value: "الوحدة 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][items][0][en]",
                  value: "Item 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][items][0][ar]",
                  value: "البند 1",
                  type: "text",
                },
                {
                  key: "samplePracticalActivities[0][en]",
                  value: "Activity 1",
                  type: "text",
                },
                {
                  key: "samplePracticalActivities[0][ar]",
                  value: "النشاط 1",
                  type: "text",
                },
                { key: "image", value: "path/to/image.jpg", type: "file" },
                {
                  key: "academyCategory",
                  value: "academyCategory",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/course/update",
              bodyType: "form-data",
              fields: [
                { key: "_id", value: "<id>", type: "text" },
                {
                  key: "title[en]",
                  value: "Updated Course Title",
                  type: "text",
                },
                {
                  key: "title[ar]",
                  value: "Updated Course Title",
                  type: "text",
                },
                {
                  key: "programOverview[en]",
                  value: "Updated program overview",
                  type: "text",
                },
                {
                  key: "programOverview[ar]",
                  value: "Updated program overview",
                  type: "text",
                },
                {
                  key: "programObjectives[0][en]",
                  value: "Objective 1",
                  type: "text",
                },
                {
                  key: "programObjectives[0][ar]",
                  value: "الهدف 1",
                  type: "text",
                },
                {
                  key: "targetAudience[0][en]",
                  value: "Audience 1",
                  type: "text",
                },
                {
                  key: "targetAudience[0][ar]",
                  value: "الجمهور 1",
                  type: "text",
                },
                {
                  key: "expectedOrganizationalBenefits[0][en]",
                  value: "Benefit 1",
                  type: "text",
                },
                {
                  key: "expectedOrganizationalBenefits[0][ar]",
                  value: "الفائدة 1",
                  type: "text",
                },
                {
                  key: "programDuration[en]",
                  value: "2 to 3 days",
                  type: "text",
                },
                {
                  key: "programDuration[ar]",
                  value: "2 to 3 days",
                  type: "text",
                },
                {
                  key: "programDurationDetails[en]",
                  value: "Optional details",
                  type: "text",
                },
                {
                  key: "programDurationDetails[ar]",
                  value: "Optional details",
                  type: "text",
                },
                {
                  key: "deliveryFormat[0][en]",
                  value: "In-person",
                  type: "text",
                },
                {
                  key: "deliveryFormat[0][ar]",
                  value: "حضوري",
                  type: "text",
                },
                {
                  key: "programMethodology[0][en]",
                  value: "Facilitated learning",
                  type: "text",
                },
                {
                  key: "programMethodology[0][ar]",
                  value: "تعلم ميسر",
                  type: "text",
                },
                {
                  key: "programOutline[0][title][en]",
                  value: "Module 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][title][ar]",
                  value: "الوحدة 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][items][0][en]",
                  value: "Item 1",
                  type: "text",
                },
                {
                  key: "programOutline[0][items][0][ar]",
                  value: "البند 1",
                  type: "text",
                },
                {
                  key: "samplePracticalActivities[0][en]",
                  value: "Activity 1",
                  type: "text",
                },
                {
                  key: "samplePracticalActivities[0][ar]",
                  value: "النشاط 1",
                  type: "text",
                },
                {
                  key: "image",
                  value: "path/to/updated-image.jpg",
                  type: "file",
                },
                {
                  key: "academyCategory",
                  value: "academyCategory",
                  type: "text",
                },
              ],
              params: [],
            },
            {
              name: "Delete",
              method: "DELETE",
              url: "{{local}}/admin/course/delete/:ids",
              params: [],
            },
          ],
        },
        {
          folder: "Seo",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/admin/seo",
              params: [],
            },
            {
              name: "Update",
              method: "PUT",
              url: "{{local}}/admin/seo/update",
              bodyType: "raw",
              body: {
                homePage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                aboutPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                servicePage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                blogPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                projectPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                contactPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                teamPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                faqPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                testimonialPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                termsPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                privacyPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                bookingPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                careerPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                coursePage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
                proposalPage: {
                  title: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  description: {
                    en: "<string>",
                    ar: "<string>",
                  },
                  tags: [{ en: "<string>", ar: "<string>" }],
                },
              },
              params: [],
            },
          ],
        },
      ],
    },
    // Public Endpoints
    {
      folder: "Public",
      auth: null,
      items: [
        {
          folder: "Services",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/service",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/service/:slug",
              params: [],
            },
          ],
        },
        {
          folder: "Sub-Services",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/sub-service",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "asc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/sub-service/:slug",
              params: [],
            },
          ],
        },
        {
          folder: "Website",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/website",
              params: [],
            },
          ],
        },
        {
          folder: "Settings",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/setting",
              params: [],
            },
          ],
        },
        {
          folder: "Testimonials",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/testimonial",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
          ],
        },
        {
          folder: "FAQs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/faq",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
          ],
        },
        {
          folder: "Partners",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/partner",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
          ],
        },
        {
          folder: "Blogs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/blog",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/blog/:slug",
              params: [],
            },
          ],
        },
        {
          folder: "Contacts",
          auth: null,
          items: [
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/public/contact",
              bodyType: "raw",
              body: {
                fullName: "<string>",
                email: "<string>",
                subject: "<string>",
                message: "<string>",
                phone: {
                  code: "<string>",
                  number: "<string>",
                },
              },
              params: [],
            },
          ],
        },
        {
          folder: "Projects",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/project",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "service", value: "", type: "query" },
                { key: "tags", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/project/:slug",
              params: [],
            },
          ],
        },
        {
          folder: "Teams",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/team",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/team/:id",
              params: [],
            },
          ],
        },
        {
          folder: "Newsletter",
          auth: null,
          items: [
            {
              name: "Subscribe",
              method: "POST",
              url: "{{local}}/public/newsletter/subscribe",
              bodyType: "raw",
              body: {
                email: "<string>",
              },
              params: [],
            },
            {
              name: "Unsubscribe",
              method: "DELETE",
              url: "{{local}}/public/newsletter/unsubscribe/:email",
              params: [],
            },
          ],
        },
        {
          folder: "Proposal",
          auth: null,
          items: [
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/public/proposal",
              bodyType: "form-data",
              fields: [
                { key: "title", value: "title", type: "text" },
                { key: "firstName", value: "John Doe", type: "text" },
                { key: "lastName", value: "Doe", type: "text" },
                { key: "jobTitle", value: "Software Engineer", type: "text" },
                { key: "email", value: "john.doe@example.com", type: "text" },
                { key: "phone[code]", value: "phone.code", type: "text" },
                { key: "phone[number]", value: "phone.number", type: "text" },
                { key: "country", value: "United States", type: "text" },
                {
                  key: "areaOfInterest",
                  value: "Software Development",
                  type: "text",
                },
                { key: "industry", value: "Technology", type: "text" },
                { key: "companyName", value: "Example Inc.", type: "text" },
                { key: "yearlyRevenue", value: "100000", type: "text" },
                { key: "document", value: "document.pdf", type: "file" },
                { key: "comment", value: "Comment", type: "text" },
              ],
              params: [],
            },
          ],
        },
        {
          folder: "Jobs",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/job",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "type", value: "", type: "query" },
                { key: "sortBy", value: "title", type: "query" },
                { key: "sortDirection", value: "asc", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/job/:slug",
              params: [],
            },
            {
              name: "Apply",
              method: "POST",
              url: "{{local}}/public/job/apply",
              bodyType: "form-data",
              fields: [
                { key: "job", value: "688c72e919bcd2f47a5efebf", type: "text" },
                { key: "firstName", value: "John", type: "text" },
                { key: "lastName", value: "Doe", type: "text" },
                { key: "email", value: "john.doe@example.com", type: "text" },
                { key: "phone[code]", value: "961", type: "text" },
                { key: "phone[number]", value: "71015691", type: "text" },
                {
                  key: "message",
                  value: "I would like to apply for this job",
                  type: "text",
                },
                {
                  key: "document",
                  value: "path/to/document.jpg",
                  type: "file",
                },
              ],
              params: [],
            },
          ],
        },
        {
          folder: "Booking",
          auth: null,
          items: [
            {
              name: "Create",
              method: "POST",
              url: "{{local}}/public/booking",
              bodyType: "raw",
              body: {
                firstName: "<string>",
                lastName: "<string>",
                companyName: "<string>",
                companyWebsite: "<string>",
                position: "<string>",
                isDecisionMaker: "<boolean>",
                email: "<string>",
                businessPhone: {
                  code: "<string>",
                  number: "<string>",
                },
                discussionPoints: "<string>",
              },
              params: [],
            },
          ],
        },
        {
          folder: "Academy Categories",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/academy-category",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/academy-category/:id",
              params: [],
            },
          ],
        },
        {
          folder: "Courses",
          auth: null,
          items: [
            {
              name: "Find Many",
              method: "GET",
              url: "{{local}}/public/course",
              params: [
                { key: "page", value: "1", type: "query" },
                { key: "limit", value: "10", type: "query" },
                { key: "sortBy", value: "createdAt", type: "query" },
                { key: "sortDirection", value: "desc", type: "query" },
                { key: "term", value: "", type: "query" },
                { key: "academyCategory", value: "", type: "query" },
              ],
            },
            {
              name: "Find One",
              method: "GET",
              url: "{{local}}/public/course/:slug",
              params: [],
            },
          ],
        },
      ],
    },
  ],
};
