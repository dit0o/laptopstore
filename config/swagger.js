const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Laptop Store API",
            version: "1.0.0",
            description: "API documentation for the Laptop Store eCommerce website",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to API route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs available at: http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;
