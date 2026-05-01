import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let studentList = [
  {
    id: 1,
    name: "dharmik",
  },
  {
    id: 2,
    name: "ankit",
  },
  {
    id: 3,
    name: "prince",
  },
];

app.get("/", (req, res) => {
  res.render("index", { studentList });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name } = req.body;

  const NewStudent = {
    id: new Date().getTime(),
    name,
  };

  studentList.push(NewStudent);

  res.redirect("/");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("server is runing");
});
