import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collabspace",
      version: "1.0.0",
    },
  },
  apis: ["./src/controllers/*.ts"],
};

export const openapiSpecification = swaggerJSDoc(options);
