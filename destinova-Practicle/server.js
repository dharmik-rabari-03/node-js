import express from "express";
import httpError from "./middlewares/httpError.js";
import conectDB from "./config/db.js";
import route from "./router/route.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

app.use("/package", route);

app.get("/", (req, res, next) => {
  res.send("hello from server");
});

app.use((req, res, next) => {
  res
    .status(404)
    .json({ success: false, message: "requested route not found" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new httpError(error.message));
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal sever error" });
});

const port = process.env.PORT || 5000;

async function startServer(req, res, next) {
  try {
    const connect = await conectDB();

    if (!connect) {
      return next(new httpError(error, message));
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
