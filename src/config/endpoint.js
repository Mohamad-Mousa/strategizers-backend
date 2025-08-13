module.exports = {
  endpoints: [
    // admin endpoints
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
                  key: "benefits[features][0]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1]",
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
                  key: "benefits[features][0]",
                  value: "feature",
                  type: "text",
                },
                {
                  key: "benefits[features][1]",
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
      ],
    },
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
      ],
    },
  ],
};
