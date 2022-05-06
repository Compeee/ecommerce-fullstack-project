import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import usersRouter from "./routes/users.js";
import HttpError from "./models/http-error.js";
import itemsRouter from "./routes/items.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce project API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
      {
        url: "http://172.16.7.1:5000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          name: "Authorization",
          bearerFormat: "token",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });
}

export default app;
