import express from "express";
import httpError from "./middleware/httpError.js";
import connectdb from "./config/db.js";

import route from "./routes/employeeRoute.js";


const app = express();

app.use(express.json());
app.use("/employee",route)

app.get("/", (req, res, next) => {
  res.send("hello from server");
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "route not found" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new httpError(error.message));
  }

  res.status(Error.status || 404).json({
    success: false,
    message: error.message || "something went wrong",
  });
});

const port = 5000;

async function server(req, res, next) {
  try {
    const connects = await connectdb();

    if (!connects) {
      throw new Error("failed to connect DB");
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


server()