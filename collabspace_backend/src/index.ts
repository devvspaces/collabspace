import express from "express";
import swaggerUI from "swagger-ui-express";
import { env } from "./config/env";
import { openapiSpecification } from "./config/swagger";

const app = express();

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.listen(env.PORT, () => {
  console.log(`Connected on port ${env.PORT}`);
});
