const lambda = require("./index");
const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();

// app.get('/_healthz', function (req, res) {
//   res.send('1');
// });

app.get("/thumbnail/:b64url", function(req, res) {
  try {
    lambda.handler(
      {
        queryStringParameters: req.query,
        pathParameters: {
          url: req.path.replace("/thumbnail/", "")
        }
      },
      null,
      async function(something, callback) {
        res
          .status(callback.statusCode)
          .header(callback.headers)
          .send(Buffer.from(callback.body, "base64"));
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

const certPath = "certs/cert.pem";
const certPrivKeyPath = "certs/key.pem";
let httpsOptions;
if (fs.existsSync(certPath) && fs.existsSync(certPrivKeyPath)) {
  httpsOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(certPrivKeyPath)
  };
}

let server;
if (httpsOptions) {
  server = https.createServer(httpsOptions, app);
} else {
  server = app;
}
server.listen(5000, function() {
  console.log("listening on :5000");
});
