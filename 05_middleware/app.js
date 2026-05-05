import express from "express";
import helmet from "helmet";

const app = express();

// 4. external middleware

app.use(helmet());

// 1. application level middle ware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

// 2. routes level middleware

app.get("/about", (req, res) => {
  res.send("this is about page");
});

//3. undefined routes

app.use((req, res) => {
  res.status(404).send("lost your way");
});

//5. centralized error

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }

  console.log(`server is running on port  ${port}`);
});
