const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "GiveBack",
		version: "1.0.0",
		description: "GiveBack API Documentation",
	},
};

const options = {
	swaggerDefinition,
	apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;