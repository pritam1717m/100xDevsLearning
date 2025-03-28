import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamsSchema } from "./openapi/input";
import { UserSchema } from "./openapi/output";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

const getUserRoute = createRoute({
  method: "get",
  path: "/user/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({url : "/doc  "}))

export default app;