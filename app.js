const lambda = require("./index");
const express = require("express");

const app = express();

app.get("/_healthz", function(req, res) {
  res.send("1");
});

app.get("*", (req, res) => {
  const url = req.url.substring(1);
  console.log({ query: req.query, url });

  lambda.handler(
    {
      queryStringParameters: req.query,
      pathParameters: { url }
    },
    null,
    async function(something, callback) {
      console.log("callback: ", callback);
      res
        .status(callback.statusCode)
        .header(callback.headers)
        .send(callback.body);
    }
  );
});

app.listen(5002, function() {
  console.log("listening on :5002");
});
