import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("this is home page");
  } else if (req.url === "/about") {
    res.end("this is about page");
  } else {
    res.end("page not found");
  }
});

const port = 5003;

server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("server is running");
});
