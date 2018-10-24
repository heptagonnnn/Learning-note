const https = require("https");

const fs = require("fs");


const options = {
  key: fs.readFileSync("./.ssh/key.pem"),
  cert: fs.readFileSync("./.ssh/key-cert.pem")
};


https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8081);