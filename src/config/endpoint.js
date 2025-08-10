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
      ],
    },
  ],
};
