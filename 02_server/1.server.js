import http from "http";

const server = http.createServer((req, res) => {
  res.write("hello world");
  res.end();
});

const port = 5001;

server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("server is running");
});
