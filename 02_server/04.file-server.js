import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      return res.end("file not found");
    } else {
      res.end(data);
    }
  });
});

const port = 5002;
3;
server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("server is running");
});
