const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Express API with Swagger",
      version: "1.0.0",
      description: "API documentation for the Node.js Express project",
      contact: {
        name: "Developer",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
        },
      ],
    },
  },
  apis: ["./src/routes/*.js"], // Chỉ định các file chứa định nghĩa API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
