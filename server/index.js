const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

app.get("/list", async (req, res) => {
  sendRequest("http://hiring.rewardgateway.net/list", "GET", {
    user: "hard",
    pass: "hard",
  })
    .then((data) => {
      res.send(data);
      res.end("here is your data");
    })
    .catch((err) => {
      res.send([]);
      res.end("here is your error: " + err);
    });
});

function sendRequest(url, method, auth) {
  const options = {
    url,
    method,
    auth,
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      let json = JSON.parse(removeByteOrderMark(body));
      resolve(json);
    });
  });
}

function removeByteOrderMark(str) {
  return str.replace(/^\ufeff/g, "");
}
