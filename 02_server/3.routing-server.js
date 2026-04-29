import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(
      ` <html>
        <body style="margin:0; display:flex; justify-content:center; height:100vh;">
        <h1>This Is Home Page</h1>
        <br>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoYEYMPbhEPoBAg3ciciez2xc_kNNJLuClA&s" width="100px" height="100px" />
        </body>
      </html>`,
    );
  } else if (req.url === "/about") {
    res.end(
      ` <html>
        <body style="margin:0; display:flex; justify-content:center; height:100vh;">
        <h1>This Is About Page</h1>
        <br>
        </body>
      </html>`,
    );
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`
  <html>
    <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
      <img src="https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4413.jpg?semt=ais_hybrid&w=740&q=80" />
    </body>
  </html>
`);
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
