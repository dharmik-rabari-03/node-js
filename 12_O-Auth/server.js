import express from "express";
import connectDB from "./config/DB.js";

import dotenv from "dotenv";
import httpError from "./middlewares/httpError.js";

import passport from "./config/passport.js";

import authRouter from "./routes/authRouter.js";
import session from "express-session";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);


app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("home");
});

app.use((req, res, next) => {
  return next(new httpError("requested route not found"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new httpError(error.message));
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = process.env.PORT || 5000;

async function StartServer() {
  try {
    const connect = await connectDB();
    if (!connect) {
      return console.log("connect to failed DB");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
StartServer();
