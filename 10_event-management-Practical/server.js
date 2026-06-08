import express from "express";
import httpError from "./middlewares/httpError.js";
import connectDB from "./config/db.js";
import router from "./routes/eventRoute.js";

import dotenv from "dotenv";
dotenv.config({ dotenv: "./.env" });

const app = express();

app.use("/event", router);
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  res.status(404).json({ success: true, message: "requsted route not found" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "something went wrong" });
});

const port = 5000;

async function startserver(req, res, next) {
  try {
    const connect = await connectDB();

    if (!connect) {
      return next(new httpError(Error.message));
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

startserver();
