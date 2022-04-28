const lambda = require("./index");
const express = require("express");

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
          .send(callback.body);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.listen(5002, function() {
  console.log("listening on :5002");
});
